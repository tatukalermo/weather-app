import React from "react";
import { Forecast } from "./components/Forecast";
import { Weather } from "./components/Weather";
import { getForecastFromApi, getWeatherFromApi } from "./queries";
import { Loader } from "./components/Loader";

export class App extends React.Component {
  // Default latitude and longitude directing to Helsinki

  constructor(props) {
    super(props);

    this.state = {
      latitude: 60.1733244,
      longitude: 24.9410248,
      error: "",
      loading: true,
      forecastData: undefined,
      weatherData: undefined,
    };

    this.fetchQueries = this.fetchQueries.bind(this);
  }

  // Asking for permission to get the location from the user if browser supports Geolocation.
  // When allowed saves latitude and longitude to the class for API call in getWeather().

  async componentDidMount() {
    const success = (position) => {
      const newLatitude = position.coords.latitude;
      const newLongitude = position.coords.longitude;
      console.log(newLatitude, newLongitude);
      this.setState({
        latitude: newLatitude,
        longitude: newLongitude,
      });
      this.fetchQueries();
    };

    const error = () => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.setState((prevState) => {
            prevState.error = "User denied the request for Geolocation.";

            return prevState;
          });
          this.fetchQueries();
          break;
        case error.POSITION_UNAVAILABLE:
          this.setState((prevState) => {
            prevState.error = {
              error: "Location information is unavailable.",
            };

            return prevState;
          });
          break;
        case error.TIMEOUT:
          this.setState((prevState) => {
            prevState.error = {
              error: "The request to get user location timed out.",
            };

            return prevState;
          });
          break;
        case error.UNKNOWN_ERROR:
          this.setState((prevState) => {
            prevState.error = {
              error: "An unknown error occurred.",
            };

            return prevState;
          });
          break;
        default:
      }
    };
    /* global navigator */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        maximumAge: 0,
        timeout: 5000,
        enableHighAccuracy: true,
      });
    } else {
      const newLocal = this;
      newLocal.setState((prevState) => {
        prevState.error = {
          error: "Geolocation is not supported by this browser.",
        };

        return prevState;
      });
    }
  }

  // Gets the current date and time. Formats it for cleaner output.

  static getTime() {
    return new Date()
      .toLocaleTimeString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .replace(",", "");
  }

  // Collects the weather data from API and puts it to an Array. Then sets the state to match the data.

  async getWeather() {
    const weatherData = await getWeatherFromApi(
      this.state.latitude,
      this.state.longitude
    );

    if (weatherData) {
      console.log("Weather data:", weatherData);
      this.setState((prevState) => {
        prevState.weatherData = {
          icon: weatherData.weather[0].icon,
          temp: Math.round(weatherData.main.temp),
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          weather: weatherData.weather[0].main.toUpperCase(),
          updatedAt: App.getTime(),
          location: weatherData.name,
        };

        return prevState;
      });
    } else {
      this.setState((prevState) => {
        prevState.error = {
          error: "Unable to fetch weather",
        };

        return prevState;
      });
    }
  }

  // Gets the forecast data from the API and puts it in an Array. Then sets the state to match the data.

  async getForecast() {
    const forecastData = await getForecastFromApi(
      this.state.latitude,
      this.state.longitude
    );

    if (forecastData) {
      console.log("Forecast data:", forecastData);
      this.setState((prevState) => {
        prevState.forecastData = {
          icon: forecastData.weather.icon,
          temp: Math.round(forecastData.main.temp),
          time: forecastData.time.slice(11, 16),
          icon2: forecastData.weather_2.icon,
          temp2: Math.round(forecastData.main_2.temp),
          time2: forecastData.time_2.slice(11, 16),
          icon3: forecastData.weather_3.icon,
          temp3: Math.round(forecastData.main_3.temp),
          time3: forecastData.time_3.slice(11, 16),
        };

        return prevState;
      });
    } else {
      this.setState((prevState) => {
        prevState.error = {
          error: "Unable to fetch weather",
        };

        return prevState;
      });
    }
  }

  // Calls functions getWeather() and getForecast() then sets the loading to false.

  async fetchQueries() {
    this.setState((prevState) => {
      prevState.loading = true;
      return prevState;
    });

    await this.getWeather();
    await this.getForecast();

    this.setState((prevState) => {
      prevState.loading = false;

      return prevState;
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div>
        {this.state.weatherData && (
          <Weather
            refresh={this.fetchQueries}
            data={this.state.weatherData}
            error={this.state.error}
          />
        )}
        {this.state.forecastData && <Forecast data={this.state.forecastData} />}
      </div>
    );
  }
}
