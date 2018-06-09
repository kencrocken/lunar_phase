import React, { Component } from 'react';
import LunarPhase from './LunarPhase';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <LunarPhase />
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>
        );
    }

}

export default App;
