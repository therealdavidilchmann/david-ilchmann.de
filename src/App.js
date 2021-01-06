import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Header from './components/Header';
import Canada from './components/Canada';
import Covid from './components/covid/Covid';
import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="nav" id="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/projects" className="nav-link">Projects</Link>
            </li>
            <li className="nav-item">
              <Link to="/canada" className="nav-link">Canada</Link>
            </li>
            <li className="nav-item">
              <Link to="/covid" className="nav-link">Covid</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Header />
            <AboutMe />
          </Route>
          <Route path="/projects">
            <Header />
            <Projects />
          </Route>
          <Route path="/canada">
            <Header />
            <Canada />
          </Route>
          <Route path="/covid">
            <Header />
            <Covid />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
