import React from "react";
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './components/Landing';
import YoutubeChannel from './components/YoutubeChannel'
import Portfolio from './components/Portfolio'
import iOS from './components/iOS'
import Android from './components/Android'
import Frontend from './components/Frontend'
import Contact from './components/Contact'
import "./styles.css";
import addPortfolio from './components/addPortfolio'

export default function App() {
  return ( 
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/youtube" component={YoutubeChannel} />
        <Route path="/frontend" component={Frontend} />
        <Route path="/ios" component={iOS} />
        <Route path="/android" component={Android} />
        <Route path="/contact" component={Contact} />

        <Route path="/add_portfolio" component={addPortfolio} />
      </Switch>
    </div>
  );
}
