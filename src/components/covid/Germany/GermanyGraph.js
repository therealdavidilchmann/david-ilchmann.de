import React from 'react';
import axios from 'axios';
import '../css/Graph.css';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        if (!this.state.isLoaded) {
            try {
                let res = await axios.get("https://rki.marlon-lueckert.de/api/states");
                this.setState({
                    stats: res.data,
                    isLoaded: false
                });
                this.sortData();
            } catch (err) {}
        }
    }

    sortData = () => {
        var arr = this.state.stats.states;
        const lastUpdate = this.state.stats.lastUpdate;
        arr.sort((a, b) => a.weekIncidence - b.weekIncidence);
        this.setState({ stats: {lastUpdate: lastUpdate, states: arr} });
        this.setState({ isLoaded: true })
    }

    render() {
        if (this.state.isLoaded) {
            const data = this.state.stats.states.reverse();
            var colorTheme = 0;
            return (
                <div className="content-graph">
                    <div className="wrapper-graph">
                        {data.map(e => {
                            if (colorTheme === 0) colorTheme = 1;
                            else colorTheme = 0;
                            return (
                                <RowItem name={e.name} weekIncidence={e.weekIncidence} max={data[0].weekIncidence} colorTheme={colorTheme} key={e.name} />
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