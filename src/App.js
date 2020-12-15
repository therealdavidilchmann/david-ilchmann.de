import Header from './components/Header';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <AboutMe />
        <Projects />
      </header>
    </div>
  );
}

export default App;
