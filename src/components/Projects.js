import React from 'react';
import './css/projects.css';
import suchen from './img/suchen.jpeg';

class Projects extends React.Component {
    render() {
        return (
            <div className="container-projects" id="projects">
                <p className="title">Project Showcase</p>
                <p className="subtitle">What am I doing?</p>
                <div className="projects">
                    <Project img={suchen} title="File Searcher" description="This project was a task given to me by my dad. He found that the xcopy command in windows can't copy file paths that are larger than 256 characters. So I created this program which solves the problem by finding paths that are larger than a variable length." />
                </div>
            </div>
        )
    }
}

function Project(props) {
    const { img, title, description } = props;
    return (
        <div className="project-wrapper">
            <div className="project-img-wrapper">
                <img src={img} className="project-img" alt="" />
            </div>
            <div className="project-text">
                <p className="project-title">{title}</p>
                <hr/>
                <p className="project-description">{description}</p>
            </div>
        </div>
    )
}

export default Projects;