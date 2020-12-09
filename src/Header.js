import React from "react";
import { Link } from 'react-router-dom';
import "./styles.css";

export default function Header() {
  return (
    <div className="App">
      <header><h1><Link to="/">Milliwonkim</Link></h1></header>
      <nav>
        <li><Link to="/portfolio">Portfolio</Link></li>
        <li><Link to="/youtube">YouTube</Link></li>
        <li><Link to="frontend">Frontend Development</Link></li>
        <li><Link to="android">Android</Link></li>
        <li><Link to="ios">iOS</Link></li>
        <li><Link to="contact">Contact</Link></li>
      </nav>
    </div>
  );
}
