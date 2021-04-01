import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark w-100 " style={{ backgroundColor: "#e3f2fd" }}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/projects">Projects</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
