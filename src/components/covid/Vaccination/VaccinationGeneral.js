import React from 'react';
import axios from 'axios';
import '../css/General.css';
import { VaccinationTemplateGermany } from './api/json-converter';


class VaccinationStats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.setState({
                data: res.data,
                isLoaded: true
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.state.isLoaded) {
            const data = new VaccinationTemplateGermany(this.state.data);

            return (
                <div className="stats-content">
                    <p style={{color:"white", textAlign:"center"}}>Last Update: {data.lastUpdate}</p>
                    <div className="wrapper-stats">
                        <Stat title="Vaccinated" value={data.vaccinated} />
                        <Stat title="Quote" value={(parseFloat(data.quote) * 100).toFixed(5)} />
                        <Stat title="Vaccinated per 1000" value={parseFloat(data.vaccinatedPer1k).toFixed(3)} />
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
            <p className="stat-value">{params.value > 1 ? params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : params.value.toString().replace(".", ",") + "%"}</p>
        </div>
    );
}

export default VaccinationStats;