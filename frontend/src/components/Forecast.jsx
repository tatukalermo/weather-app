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

//Default latitude and longitude directing to Helsinki

export class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      icon: '',
      temp: '',
      time: '',
      icon2: '',
      temp2: '',
      time2: '',
      icon3: '',
      temp3: '',
      time3: '',
      location: 'Helsinki',
      latitude: 60.1733244,
      longitude: 24.9410248,
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

  //Gets the forecast data from the API and puts it in an Array. Then sets the state to match the data.

  async getForecast() {
    const [forecastData] = await Promise.all([getForecastFromApi(this.state.latitude, this.state.longitude)]);
    if (forecastData) {
      console.log('Forecast data:', forecastData)
      this.setState(
        {
          icon: forecastData.weather.icon,
          temp: Math.round(forecastData.main.temp),
          time: forecastData.time.slice(11, 16),
          icon2: forecastData.weather_2.icon,
          temp2: Math.round(forecastData.main_2.temp),
          time2: forecastData.time_2.slice(11, 16),
          icon3: forecastData.weather_3.icon,
          temp3: Math.round(forecastData.main_3.temp),
          time3: forecastData.time_3.slice(11, 16),
          loading: false,
        });
    } else {
      this.setState({ error: 'Unable to fetch forecast' });
    }
  }

  render() {
    const { icon, temp, time, icon2, temp2, time2, icon3, temp3, time3, loading } = this.state;

    if (loading) {
      return null;
    }
    return (
      <div>
        <div className="forecast">
          <div className="temp1">
            {temp && <p><span className="value">{temp} ºC</span></p>}
          </div>
          <div className="foreIcon1">
            {icon && <img width={100} height={100} alt="weather_icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />}
          </div>
          <div className="time1">
            {time && <p>{time}</p>}
          </div>
          <div className="temp2">
            {temp2 && <p><span className="value">{temp2} ºC</span></p>}
          </div>
          <div className="foreIcon2">
            {icon2 && <img width={100} height={100} alt="weather_icon" src={`https://openweathermap.org/img/wn/${icon2}@2x.png`} />}
          </div>
          <div className="time2">
            {time2 && <p>{time2}</p>}
          </div>
          <div className="temp3">
            {temp3 && <p><span className="value">{temp3} ºC</span></p>}
          </div>
          <div className="foreIcon3">
            {icon3 && <img width={100} height={100} alt="weather_icon" src={`https://openweathermap.org/img/wn/${icon3}@2x.png`} />}
          </div>
          <div className="time3">
            {time3 && <p>{time3}</p>}
          </div>
        </div>
      </div>
    );
  }
}