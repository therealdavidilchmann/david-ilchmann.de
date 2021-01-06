import React from 'react'
import "./css/header.css"
import logoImg from './img/profilepicture.jpg';
import linkedinImg from './img/linkedin.svg';
import githubImg from './img/github-logo.png';
import lebenslauf from './documents/Lebenslauf.pdf';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="header">
                    <div className="left">
                        <p className="welcome-label">Hey!<br/>I'm <span className="david-animation">David</span>.</p>
                        <p className="profession">Hobby Software Developer</p>
                        <div className="buttons">
                            <a href={lebenslauf} className="header-btn">Resume</a>
                            <Link to="/projects" className="header-btn">Projects</Link>
                        </div>
                    </div>
                    <div className="right">
                        <img src={logoImg} alt="Profilepicture" className="profilepicture" />
                    </div>
                </div>
                <div className="icons">
                    <a href="https://github.com/therealdavidilchmann" target="_blank" rel="noreferrer" className="icon-btn">
                        <img src={githubImg} alt="GitHub" className="icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/david-ilchmann-9b2310186/" target="_blank" rel="noreferrer" className="icon-btn">
                        <img src={linkedinImg} alt="LinkedIn" className="icon"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;