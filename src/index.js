import React from 'react';
import ReactDOM from 'react-dom';
import './lunarPhase/stars.css';
import './lunarPhase/LunarPhase.css';
import LunarPhase from './lunarPhase/LunarPhase';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div className="App">
    <LunarPhase />
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
</div>, document.getElementById('root'));
registerServiceWorker();
