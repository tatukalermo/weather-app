import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

const getWeatherFromApi = async (city) => {
  try {
    const response = await fetch(`${baseURL}/weatherbycity?city=${city}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async (city) => {
  try {
    const response = await fetch(`${baseURL}/forecast?q=${city}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

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
      this.setState({ error: 'Unbable to fetch weather' });
    }
  }

  render() {
    const { icon, temp, humidity, pressure, location, updatedAt } = this.state;

    return (
      <div>
        <div className="icon">
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

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      temp: '',
      location: 'Helsinki',
      error: '',
    };
  }

  async componentWillMount() {
    this.getForecast();
  }

  async getForecast() {
    const [forecastData] = await Promise.all([getForecastFromApi(this.state.location)]);
    if (forecastData) {
      console.log('Forecast data:', forecastData)
      this.setState(
        {
          icon: '',
          temp: '',
          error: '',
        });
    } else {
      this.setState({ error: 'Unbable to fetch forecast' });
    }
  }

  render() {
    const { icon, temp, location } = this.state;

    return (
      <div>
        <div className="fore">
          <h2>Forecast</h2>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Weather />,
  <Forecast />,
  document.getElementById('app')
);
