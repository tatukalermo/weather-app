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
      latitude: null,
      longitude: null,
      error: '',
    };
  }

  async componentDidMount() {
    this.getLocation();
    setTimeout(10000000);
    await this.getWeather();
  }

  //Asking for permission to get the location from the user if browser supports Geolocation.
  //When allowed saves latitude and longitude to the class for API call later.

  getLocation() {
    console.log("Location running");
    if (navigator.geolocation) {
      console.log("Geolocation");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("latitude:" + position.coords.latitude + " longitude:" + position.coords.longitude);
          this.setState(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          console.log(this.state.longitude);
          console.log(this.state.latitude);
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
        },
        //{ maximumAge: 0, timeout: 5000, enableHighAccuracy: true }
      );
    } else {
      this.setState(
        {
          error: 'Geolocation is not supported by this browser.',
        });
    }
    console.log("end of Location");
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
          <h2>Current weather in {location}</h2>
          {icon && <img width={100} height={100} alt="weather_icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />}
          {updatedAt && <p>{updatedAt}</p>}
          {temp && <p>Temperature: {temp} ºC</p>}
          {humidity && <p>Humidity: {humidity} %</p>}
          {pressure && <p>Air pressure: {pressure} hPa</p>}
          <button onClick={() => this.getWeather()}>Update</button>
          {error && <p>{error}</p>}
        </div>
      </div>
    );
  }
}