import React from 'react';
import './css/Covid.css';
import GraphStates from './GraphStates';
import SelectState from './GraphDistricts';
import StatsGermany from './StatsGermany';

class Covid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: 0
        }
    }
    
    toggleSwitch(aim) {
        for (let i = 0; i < 3; i++) {
            if (i === aim) {
                document.getElementById(i).style.backgroundColor = "rgb(50,50,250)";
                document.getElementById(i).style.color = "white";
            } else {
                document.getElementById(i).style.backgroundColor = "white";
                document.getElementById(i).style.color = "black";
            }
        }
        this.setState({graph: aim});
    }
    
    render() {
        return (
            <div className="covid-content">
                <div className="switch-wrap">
                    <div className="switch">
                        <button onClick={() => this.toggleSwitch(0)} id={0} style={{backgroundColor: "rgb(50,50,250)", color:"white"}}>Germany</button>
                        <button onClick={() => this.toggleSwitch(1)} id={1}>Districts</button>
                        <button onClick={() => this.toggleSwitch(2)} id={2}>Vaccines</button>
                    </div>
                </div>

                <div className="graph">
                    {this.state.graph === 0 && (<div><StatsGermany /> <GraphStates /></div>)}
                    {this.state.graph === 1 && <SelectState />}
                </div>
            </div>
        )
    }
}

export default Covid;