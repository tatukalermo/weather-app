import React from 'react';

// ENVIRONMENT VARIABLES

const baseURL = process.env.ENDPOINT || 'http://localhost:9000/api';

// FUNCTIONS

const getForecastFromApi = async (city) => {
  try {
    const response = await fetch(`${baseURL}/forecast?q=${city}&count=10`);
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
      error: '',
    };
  }

  componentDidMount() {
    this.getForecast();
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

  //Gets the forecast data from the API and puts it in an Array.

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