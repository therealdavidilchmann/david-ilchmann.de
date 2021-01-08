import React from 'react';
import './css/Information.css';

class Information extends React.Component {
    render() {
        return (
            <div>
                <div className="sources">
                    <p>Source: <a href="https://github.com/marlon360/rki-covid-api">https://github.com/marlon360/rki-covid-api</a></p>
                    <p>I don't take any responsibility for the data. According to Marlon Lückert it's by the Robert-Koch-Institut which I didn't check.</p>
                </div>
            </div>
        );
    }
}

export default Information;