import React from 'react';

// ENVIRONMENT VARIABLES

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

// FUNCTIONS

const getForecastFromApi = async (lat, lon) => {
  try {
    const response = await fetch(`${baseURL}/forecastbycoordinates?lat=${lat}&lon=${lon}&count=10`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

// CLASSES

export class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      temp: '',
      location: 'Helsinki',
      latitude: null,
      longitude: null,
      error: '',
    };
  }

  //Asking for permission to get the location from the user if browser supports Geolocation.
  //When allowed saves latitude and longitude to the class for API call in getForecast().

  componentDidMount() {
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      this.setState({
        latitude: latitude,
        longitude: longitude
      });
      this.getForecast();
    };

    const error = error => {
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
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, { maximumAge: 0, timeout: 5000, enableHighAccuracy: true });
    } else {
      this.setState(
        {
          error: 'Geolocation is not supported by this browser.',
        });
    }

  }

  //Gets the forecast data from the API and puts it in an Array.

  async getForecast() {
    const [forecastData] = await Promise.all([getForecastFromApi(this.state.latitude, this.state.longitude)]);
    if (forecastData) {
      console.log('Forecast data:', forecastData)
      this.setState(
        {
          icon: '',
          temp: '',
          error: '',
        });
    } else {
      this.setState({ error: 'Unable to fetch forecast' });
    }
  }

  render() {
    const { icon, temp, location } = this.state;

    return (
      <div>
        <div className="forecast">
          <h2>Forecast</h2>
          <button onClick={() => this.getForecast()}>Forecast</button>
        </div>
      </div>
    );
  }
}