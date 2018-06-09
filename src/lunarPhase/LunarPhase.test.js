/* global it */
import React from 'react';
import ReactDOM from 'react-dom';
import LunarPhase from './LunarPhase';

it('renders without crashing', () => {

    const div = document.createElement('div');
    ReactDOM.render(<LunarPhase />, div);
    ReactDOM.unmountComponentAtNode(div);

});
