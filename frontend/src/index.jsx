import React from 'react';
import ReactDOM from 'react-dom';
import { Forecast } from './components/Forecast';
import { Weather } from './components/Weather';

ReactDOM.render(
  <div>
    <Weather />
    <Forecast />
  </div>,
  document.getElementById('app')
);
