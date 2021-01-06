import React from 'react';
import axios from 'axios';
import './css/StatsGermany.css';

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
            let res = await axios.get("https://rki.marlon-lueckert.de/api/general");
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
            return (
                <div className="wrapper-stats">
                    <Stat title="Cases" value={data.cases} />
                    <Stat title="Deaths" value={data.deaths} />
                    <Stat title="Recovered" value={data.recovered} />
                    <Stat title="Week incidence" value={parseInt(data.weekIncidence)} />
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