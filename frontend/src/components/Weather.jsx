import React from 'react';

// ENVIRONMENT VARIABLES

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

// FUNCTIONS

const getWeatherFromApi = async (lat, lon) => {
  try {
    const response = await fetch(`${baseURL}/weatherbycoordinates?lat=${lat}&lon=${lon}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

// CLASSES

export class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      temp: '',
      humidity: '',
      pressure: '',
      timeStamp: '',
      location: 'Helsinki',
      latitude: 60.229506099999995,
      longitude: 24.787014499999998,
      error: '',
    };
  }

  //Asking for permission to get the location from the user if browser supports Geolocation.
  //When allowed saves latitude and longitude to the class for API call in getWeather().

  async componentDidMount() {
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
      this.getWeather();
    };

    const error = error => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.setState(
            {
              error: 'User denied the request for Geolocation.',
            });
          this.getWeather();
          break;
        case error.POSITION_UNAVAILABLE:
          this.setState(
            {
              error: 'Location information is unavailable.',
            });
          break;
        case error.TIMEOUT:
          this.setState(
            {
              error: 'The request to get user location timed out.',
            });
          break;
        case error.UNKNOWN_ERROR:
          this.setState(
            {
              error: 'An unknown error occurred.',
            });
          break;
      }
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, { maximumAge: 0, timeout: 5000, enableHighAccuracy: true });
    } else {
      this.setState(
        {
          error: 'Geolocation is not supported by this browser.',
        });
    }
    console.log(this.state.longitude);
    console.log(this.state.latitude);
  }

  // Collects the weather data from API and puts it to an Array. Then sets the state to match the data.

  async getWeather() {
    console.log("Weather running");
    console.log(this.state.longitude);
    console.log(this.state.latitude);
    const [weatherData] = await Promise.all([getWeatherFromApi(this.state.latitude, this.state.longitude)]);
    if (weatherData) {
      console.log('Weather data:', weatherData)
      this.setState(
        {
          icon: weatherData.weather[0].icon,
          temp: Math.round(weatherData.main.temp),
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          updatedAt: new Date().toTimeString(),
          location: weatherData.name,
          error: '',
        });
    } else {
      this.setState({ error: 'Unable to fetch weather' });
    }
    console.log("Weather ending");
  }

  render() {
    const { icon, temp, humidity, pressure, location, updatedAt, error } = this.state;

    return (
      <div>
        <div className="weather">
          <div className="refresh">
            <img className="icon" src="https://image.flaticon.com/icons/svg/1/1774.svg" onClick={() => this.getWeather()} />
          </div>
          <div className="topRow">
            <div className="topIcon">
              <img className="icon" src="https://image.flaticon.com/icons/svg/1216/1216895.svg" />
            </div>
            <div className="topLocation">
              <h2>Current weather in {location}</h2>
            </div>
            <div className="updatedTime">
              {updatedAt && <p>{updatedAt}</p>}
            </div>
          </div>
          <div className="main">
            <div className="currentWeather">
              <div className="currentIcon">
                {icon && <img width={100} height={100} alt="weather_icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />}
              </div>
              <div className="currentTemp">
                {temp && <p>Temperature: {temp} ºC</p>}
              </div>
            </div>
            <div className="humidity">
              <div className="humidityIcon">
                <img className="icon" src="https://image.flaticon.com/icons/svg/3144/3144126.svg" />
              </div>
              <div className="humidityInfo">
                {humidity && <p>Humidity: {humidity} %</p>}
              </div>
            </div>
            <div className="airPressure">
              <div className="pressureIcon">
                <img className="icon" src="https://image.flaticon.com/icons/svg/556/556958.svg" />
              </div>
              <div className="pressureInfo">
                {pressure && <p>Air pressure: {pressure} hPa</p>}
              </div>
            </div>
            <div className="error">
              <div>
                {error && <p>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}