import React from 'react';
import './css/Covid.css';
import { Information } from './Information/package';
import { FurtherResources } from './FurtherResources/package';
import { StateSelect, StateGeneral } from './states/package';
import { VaccinationGeneral, VaccinationGraph } from './Vaccination/package';
import { GermanyGeneral, GermanyGraph } from './Germany/package';

class Covid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            switchMain: 0,
            switchSpecify: 0
        }
    }
    
    toggleSwitchMain(aim) {
        for (let i = 0; i < 3; i++) {
            if (i === aim) {
                document.getElementById("specify-"+i).classList.remove("hidden");
            } else {
                if (!document.getElementById("specify-"+i).classList.contains("hidden"))
                    document.getElementById("specify-"+i).classList.add("hidden");
            }
        }
        this.setState({ switchMain: aim, switchSpecify: 0 });
        this.updateFocusBtn("" + aim + this.state.switchSpecify);
    }

    toggleSwitchSpecify(aim) {
        this.setState({ switchSpecify: aim });
        this.updateFocusBtn("" + this.state.switchMain + aim);
    }

    updateFocusBtn(id) {
        let allBtns = document.getElementsByClassName("switch-specify-btn");
        for (let i = 0; i < allBtns.length; i++) {
            if (allBtns[i].id === id) {
                allBtns[i].style.color = "red";
            } else {
                allBtns[i].style.color = "white";
            }
        }
    }
    
    render() {
        return (
            <div className="covid-app">
                <div className="covid-content">
                    <div className="switch-wrap">
                        <div className="switch">
                            <button id="0" className="switch-main-btn" onClick={() => { this.toggleSwitchMain(0) }}>Germany</button>
                            <div className="switch-specify-wrap" id="specify-0">
                                <button id="00" className="switch-specify-btn" onClick={() => this.toggleSwitchSpecify(0)} style={{color: "red"}}>General</button>
                                <button id="01" className="switch-specify-btn" onClick={() => this.toggleSwitchSpecify(1)}>States</button>
                            </div>
                            <button id="1" className="switch-main-btn" onClick={() => { this.toggleSwitchMain(1) }}>Districts</button>
                            <div className="switch-specify-wrap hidden" id="specify-1">
                                <button id="10" className="switch-specify-btn" onClick={() => this.toggleSwitchSpecify(0)}>General</button>
                                <button id="11" className="switch-specify-btn" onClick={() => this.toggleSwitchSpecify(1)}>Select a state</button>
                            </div>
                            <button id="2" className="switch-main-btn" onClick={() => this.toggleSwitchMain(2)}>Vaccinations</button>
                            <div className="switch-specify-wrap hidden" id="specify-2">
                                <button id="20" className="switch-specify-btn" onClick={() => this.toggleSwitchSpecify(0)}>General</button>
                                <button id="21" className="switch-specify-btn" onClick={() => this.toggleSwitchSpecify(1)}>Graph</button>
                            </div>
                            <button id="3" className="switch-main-btn" onClick={() => this.toggleSwitchMain(3)}>Information</button>
                            <div className="switch-specify-wrap hidden" id="specify-3"></div>
                            <button id="4" className="switch-main-btn" onClick={() => this.toggleSwitchMain(4)}>Further Resources</button>
                            <div className="switch-specify-wrap hidden" id="specify-3"></div>
                        </div>
                    </div>

                    <div className="graph">
                        {(this.state.switchMain === 0 && this.state.switchSpecify === 0) && <GermanyGeneral />}
                        {(this.state.switchMain === 0 && this.state.switchSpecify === 1) && <GermanyGraph />}
                        {(this.state.switchMain === 1 && this.state.switchSpecify === 0) && <StateGeneral />}
                        {(this.state.switchMain === 1 && this.state.switchSpecify === 1) && <StateSelect />}
                        {(this.state.switchMain === 2 && this.state.switchSpecify === 0) && <VaccinationGeneral />}
                        {(this.state.switchMain === 2 && this.state.switchSpecify === 1) && <VaccinationGraph />}
                        {(this.state.switchMain === 3 && this.state.switchSpecify === 0) && <Information />}
                        {(this.state.switchMain === 4 && this.state.switchSpecify === 0) && <FurtherResources />}
                    </div>
                </div>
            </div>
        )
    }
}

export default Covid;