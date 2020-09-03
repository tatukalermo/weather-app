import React from 'react';
import ReactDOM from 'react-dom';
import { Forecast } from './components/Forecast';

// ENVIRONMENT VARIABLES

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

// FUNCTIONS

const getWeatherFromApi = async (city) => {
  try {
    const response = await fetch(`${baseURL}/weatherbycity?city=${city}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

// CLASSES

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      temp: '',
      humidity: '',
      pressure: '',
      timeStamp: '',
      location: 'Helsinki',
      error: '',
    };
  }

  async componentWillMount() {
    this.getWeather();
  }

  // Collects the weather data from API and puts it to an Array. Then sets the state to match the data.

  async getWeather() {
    const [weatherData] = await Promise.all([getWeatherFromApi(this.state.location)]);
    if (weatherData) {
      console.log('Weather data:', weatherData)
      this.setState(
        {
          icon: weatherData.weather[0].icon,
          temp: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          updatedAt: new Date().toISOString(),
          error: '',
        });
    } else {
      this.setState({ error: 'Unable to fetch weather' });
    }
  }

  render() {
    const { icon, temp, humidity, pressure, location, updatedAt } = this.state;

    return (
      <div>
        <div className="weather">
          <h2>Current weather in {location}</h2>
          {icon && <img width={100} height={100} alt="weather_icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />}
          {updatedAt && <p>{updatedAt}</p>}
          {temp && <p>Temperature: {temp}ºC</p>}
          {humidity && <p>Humidity: {humidity}</p>}
          {pressure && <p>Air pressure: {pressure}</p>}
          <button onClick={() => this.getWeather()}>Update</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Weather />
    <Forecast />
  </div>,
  document.getElementById('app')
);
