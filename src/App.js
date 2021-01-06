import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Landing from './components/Landing';
import Music from './components/Music';
import MyPortfolio from './components/MyPortfolio';
import PartTimeJob from './components/PartTimeJob';
import Art from './components/Art';
import directMessage from './components/directMessage';
import './styles.css';

export default function App() {
    return (
        <div className='App'>
            <Header />
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/myportfolio' component={MyPortfolio} />
                <Route path='/music' component={Music} />
                <Route path='/art' component={Art} />
                <Route path='/parttime' component={PartTimeJob} />
                <Route path='/dm' component={directMessage} />
            </Switch>
        </div>
    );
}
