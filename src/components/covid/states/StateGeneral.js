import React from 'react';
import axios from 'axios';
import '../css/Graph.css';
import '../css/General.css';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            districts: [],
            displayedDistricts: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        if (!this.state.isLoaded) {
            let res = await axios.get("https://api.corona-zahlen.org/districts");
            let data = res.data.data;
            var neededData = []
            for (const [, value] of Object.entries(data)) {
                neededData.push(value);
            }
            this.setState({ districts: neededData });
            this.sortData(neededData);
        }
    }

    sortData = (arr) => {
        arr.sort((a, b) => a.weekIncidence - b.weekIncidence);
        this.setState({ displayedDistricts: arr });
        this.setState({ isLoaded: true })
    }

    handleSettingChange() {
        let minIncidence = document.getElementById('min-incidence-input').value || 0;
        let query = document.getElementById('query-input').value;
        var newDisplayedData = [];

        this.setState({isLoaded: false})
        for (let i = 0; i < this.state.districts.length; i++) {
            if (this.state.districts[i].name.toLowerCase().includes(query.toLowerCase()) && (this.state.districts[i].weekIncidence > minIncidence)) {
                newDisplayedData.push(this.state.districts[i]);
            }
        }

        this.sortData(newDisplayedData);
        this.setState({isLoaded: true});
    }

    render() {
        if (this.state.isLoaded) {
            const data = this.state.displayedDistricts.reverse();
            var colorTheme = 0;
            return (
                <div className="content-graph">
                    <div className="img-wrap">
                        <img src="https://api.corona-zahlen.org/map/districts" alt=""/>
                    </div>
                    <div className="graph-queries">
                        <label htmlFor="query-input" className="graph-queries-label">Query</label>
                        <input type="text" name="query-input" id="query-input" onChange={() => this.handleSettingChange()} />
                    </div>
                    <div className="graph-queries">
                        <label htmlFor="min-incidence-input" className="graph-queries-label">Minimal incidence</label>
                        <input type="number" name="min-incidence-input" id="min-incidence-input" onChange={() => this.handleSettingChange()} />
                    </div>
                    <div className="wrapper-graph">
                        {data.map(e => {
                            if (colorTheme === 0) colorTheme = 1;
                            else colorTheme = 0;
                            return (
                                <RowItem name={e.name} weekIncidence={e.weekIncidence} max={data[0].weekIncidence} colorTheme={colorTheme} key={e.name + e.weekIncidence} />
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
                <ProgressBar amount={params.weekIncidence.toFixed(2)} max={params.max} colorTheme={params.colorTheme} />
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