import React from 'react';
import axios from 'axios';
import '../css/Graph.css';
import { converter, allStates } from '../helper/stateNameConverter'

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelecting: true,
            selectedState: ""
        }
    }
    
    onStateSelected(state) {
        this.setState({ isSelecting: false })
        this.setState({ selectedState: state })
    }

    render() {
        if (this.state.isSelecting) {
            return (
                <div className="select-grid">
                    {allStates.map(e => {
                        return (
                            <div className="row-select" key={e[0] + e[1]}>
                                {e.map(state => <button onClick={() => this.onStateSelected(state)} key={state} className="state-select-btn">{state}</button>)}
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div>
                    <div className="state-select-back">
                        <button onClick={() => {this.setState({isSelecting: true})}} className="state-select-back-btn">Back</button>
                    </div>
                    <Graph state={this.state.selectedState} />
                </div>
            )
        }
    }
}

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
                let res = await axios.get("https://rki.marlon-lueckert.de/api/districts");
                let data = res.data;
                let allDistricts = data.districts;
                var neededDistricts = []
                for (let i = 0; i < allDistricts.length; i++) {
                    const district = allDistricts[i];
                    for (let j = 0; j < converter[this.props.state]().length; j++) {
                        if (converter[this.props.state]()[j] === district.name) {
                            neededDistricts.push(district);
                        }
                    }
                }
                console.log(neededDistricts)
                this.setState({
                    stats: {lastUpdate: data.lastUpdate, districts: neededDistricts},
                    isLoaded: false
                });
                this.sortData();
            } catch (err) {}
        }
    }

    sortData = () => {
        var arr = this.state.stats.districts;
        const lastUpdate = this.state.stats.lastUpdate;
        arr.sort((a, b) => a.weekIncidence - b.weekIncidence);
        this.setState({ stats: {lastUpdate: lastUpdate, districts: arr} });
        this.setState({ isLoaded: true })
    }

    render() {
        if (this.state.isLoaded) {
            const data = this.state.stats.districts.reverse();
            var colorTheme = 0;
            return (
                <div className="content-graph">
                    <div className="wrapper-graph">
                        {data.map(district => {
                            if (colorTheme === 0) colorTheme = 1;
                            else colorTheme = 0;
                            return (
                                <RowItem name={district.name} weekIncidence={district.weekIncidence} max={data[0].weekIncidence} colorTheme={colorTheme} key={district.name + "-" + district.weekIncidence} />
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

export default Select;