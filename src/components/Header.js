import React from 'react'
import "./css/header.css"
import logoImg from './img/profilepicture.jpg';
import linkedinImg from './img/linkedin.svg';
import githubImg from './img/github-logo.png';

class Header extends React.Component {
    render() {
        return (
            <div className="content">
                <div className="header">
                    <div className="left">
                        <p className="welcome-label">Hey!<br/>I'm David.</p>
                        <p className="profession">Hobby Software Developer</p>
                        <div className="buttons">
                            <a href="mailto:david.ilchmann@gmail.com" className="header-btn">Contact me</a>
                            <a href="#projects" className="header-btn">Projects</a>
                        </div>
                    </div>
                    <div className="right">
                        <img src={logoImg} alt="Profilepicture" className="profilepicture" />
                    </div>
                </div>
                <div className="icons">
                    <a href="https://github.com/therealdavidilchmann" className="icon-btn">
                        <img src={githubImg} alt="GitHub" className="icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/david-ilchmann-9b2310186/" className="icon-btn">
                        <img src={linkedinImg} alt="LinkedIn" className="icon"/>
                    </a>
                </div>
            </div>
        );
    }
}

export default Header;