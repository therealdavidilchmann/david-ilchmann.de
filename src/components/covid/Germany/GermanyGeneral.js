import React from 'react';
import axios from 'axios';
import '../css/General.css';


class StatsGermany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stats: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        try {
            let res = await axios.get("https://api.corona-zahlen.org/germany");
            this.setState({
                stats: res.data,
                isLoaded: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.isLoaded) {
            const data = this.state.stats;
            const dateObj = new Date();
            const month = dateObj.getMonth();
            const day = String(dateObj.getDate()).padStart(2, '0');
            const year = dateObj.getFullYear();
            return (
                <div className="stats-content">
                    <p style={{color:"white", textAlign:"center"}}>Last Update: {day + "." + month+1 + "." + year}</p>
                    <div className="wrapper-stats">
                        <Stat title="Cases" value={data.cases} />
                        <Stat title="Deaths" value={data.deaths} />
                        <Stat title="Recovered" value={data.recovered} />
                        <Stat title="Week incidence" value={parseInt(data.weekIncidence)} />
                    </div>
                    <div className="img-wrap">
                        <img src="https://api.corona-zahlen.org/map/states" alt="" />
                    </div>
                </div>
            )
        } else {
            return (
                <div>fetching data...</div>
            )
        }
    }
}

function Stat(params) {
    return (
        <div className="stat">
            <p className="stat-title">{params.title}</p>
            <p className="stat-value">{params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
        </div>
    );
}

export default StatsGermany;