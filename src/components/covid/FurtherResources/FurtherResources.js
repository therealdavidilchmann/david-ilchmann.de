import React from 'react';
import './css/Information.css';

class Information extends React.Component {
    render() {
        return (
            <div>
                <div className="sources">
                    <p>Intensive care beds: <a href="https://www.intensivregister.de/#/aktuelle-lage/kartenansichten" target="_blank" rel="noreferrer">https://www.intensivregister.de/#/aktuelle-lage/kartenansichten</a></p>
                    <p>Android application: <a href="https://play.google.com/store/apps/details?id=com.kokoschka.michael.casestoday&hl=de" target="_blank" rel="noreferrer">https://play.google.com/store/apps/details?id=com.kokoschka.michael.casestoday&hl=de</a></p>
                </div>
            </div>
        );
    }
}

export default Information;