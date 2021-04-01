
import './App.css';
import React, { useEffect } from 'react'
import Main from './Main/Main';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Navbar from './Navbar/Navbar';
import Contact from './Contact/Contact';
import Projects from './Projects/Projects';



function App() {

  useEffect(() => {
    document.title = "Itay Taasa"
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/Projects">
            <Projects />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}




export default App;
