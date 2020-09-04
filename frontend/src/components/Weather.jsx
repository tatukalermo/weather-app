import React from 'react';

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
      latitude: null,
      longitude: null,
      error: '',
    };
  }

  componentDidMount() {
    this.getLocation();
    this.getWeather();
  }

  //Asking for permission to get the location from the user if browser supports Geolocation.
  //When allowed saves latitude and longitude to the class for API call later.

  async getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("latitude:" + position.coords.latitude + " longitude:" + position.coords.longitude);
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.setState(
                {
                  error: 'User denied the request for Geolocation.',
                });
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
        }
      );
    } else {
      this.setState(
        {
          error: 'Geolocation is not supported by this browser.',
        });
    }
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
          updatedAt: new Date().toTimeString(),
          error: '',
        });
    } else {
      this.setState({ error: 'Unable to fetch weather' });
    }
  }

  render() {
    const { icon, temp, humidity, pressure, location, updatedAt, error } = this.state;

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
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}