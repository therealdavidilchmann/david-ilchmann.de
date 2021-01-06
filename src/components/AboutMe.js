import React from 'react'
import "./css/aboutMe.css"
import logoImg from './img/bw-flex.jpg';

class AboutMe extends React.Component {
    render() {
        return (
            <div className="container">
                <p className="title">About me</p>
                <p className="subtitle">Who am I?</p>
                <div className="description">
                    <img src={logoImg} alt="" className="description-img"/>
                    <p className="description-label">I'm <strong>David Ilchmann</strong> from Darmstadt, Germany! Currently, I'm doing my a-levels and some programming on the side. I love <strong>full-stack web</strong> and <strong>mobile development</strong>.</p>
                </div>
            </div>
        );
    }
}

export default AboutMe;