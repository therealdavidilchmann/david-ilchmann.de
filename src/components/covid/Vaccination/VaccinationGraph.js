import React from 'react';
import axios from 'axios';
import '../css/Graph.css';
import { VaccinationTemplateGermany } from './api/json-converter';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastUpdate: "",
            data: {},
            isLoaded: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            let res = await axios.get("https://api.corona-zahlen.org/vaccinations");
            this.setState({ lastUpdate: res.data.meta.lastUpdate })
            this.sortData(res.data.data.states);
        } catch (err) {
            console.log(err);
        }
    }

    sortData = (arr) => {
        var items = Object.keys(arr).map(key => {
            return arr[key];
        });
        items.sort((a, b) => a.vaccinated - b.vaccinated);
        this.setState({ stats: items });
        this.setState({ isLoaded: true });
    }

    render() {
        if (this.state.isLoaded) {
            const data = this.state.stats.reverse();
            var colorTheme = 0;
            return (
                <div className="content-graph">
                    <p style={{color:"white", textAlign:"center"}}>Last Update: {VaccinationTemplateGermany.convertDate(this.state.lastUpdate)}</p>
                    <div className="wrapper-graph">
                        {data.map(e => {
                            if (colorTheme === 0) colorTheme = 1;
                            else colorTheme = 0;
                            return (
                                <RowItem name={e.name} vaccinated={e.vaccinated} max={data[0].vaccinated} colorTheme={colorTheme} key={e.name + e.vaccinated} />
                            )
                        })}
                    </div>
                    <div className="placeholder"></div>
                </div>
            )
        } else {
            return (
                <div>fetching data...</div>
            )
        }
    }
}

function RowItem(params) {
    return (
        <div className="row-item">
            <p className="state-name">{params.name}</p>
            <div className="progress-bar-wrap">
                <ProgressBar amount={params.vaccinated.toFixed(2)} max={params.max} colorTheme={params.colorTheme} />
            </div>
        </div>
    );
}

function ProgressBar(params) {
    const bgColors = ['rgb(20, 20, 200)', 'rgb(80, 200, 80)'];
    const colors = ['rgb(200, 200, 200', "black"];
    return (
        <div className="states-progress-bar" style={{width: ((params.amount / params.max) * 100 + '%'), backgroundColor: bgColors[params.colorTheme], color: colors[params.colorTheme]}}>
            <p>{parseInt(params.amount)}</p>
        </div>
    );
}

export default Graph;