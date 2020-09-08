import React from "react";

export const Weather = (props) => {
  console.log(props);
  const {
    icon,
    temp,
    humidity,
    pressure,
    location,
    updatedAt,
    weather,
  } = props.data;

  const { error } = props;

  return (
    <div>
      <div className="weather">
        <div className="refreshDiv">
          <button className="refresh" onClick={props.refresh}>
            <img
              alt="weather_icon"
              className="icon"
              src="https://image.flaticon.com/icons/svg/1/1774.svg"
            />
          </button>
        </div>
        <div className="topRow">
          <div className="topColumn">
            <div className="topIcon">
              <img
                alt="weather_icon"
                className="icon"
                src="https://image.flaticon.com/icons/svg/1216/1216895.svg"
              />
            </div>
            <div className="topLocationText">
              <h1>{location}</h1>
            </div>
          </div>
          <div className="updatedTime">{updatedAt && <p>{updatedAt}</p>}</div>
        </div>
        <div className="main">
          <div className="currentWeather">
            <div className="curDiv">
              <div className="currentIcon">
                {icon && (
                  <img
                    width={100}
                    height={100}
                    alt="weather_icon"
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  />
                )}
              </div>
              <div className="currentDiv">
                <div className="currentWeatherName">
                  {weather && <p>{weather}</p>}
                </div>
                <div className="currentTemp">{temp && <p>{temp} ºC</p>}</div>
              </div>
            </div>
            <div className="humDiv">
              <div className="humidityIcon">
                <img
                  alt="weather_icon"
                  className="icon bigIcon"
                  src="https://image.flaticon.com/icons/svg/3144/3144126.svg"
                />
              </div>
              <div className="humidityInfo">
                {humidity && (
                  <p>
                    Humidity
                    <br />
                    <span className="value">{humidity} %</span>
                  </p>
                )}
              </div>
            </div>
            <div className="presDiv">
              <div className="pressureIcon">
                <img
                  alt="weather_icon"
                  className="icon bigIcon"
                  src="https://image.flaticon.com/icons/svg/556/556958.svg"
                />
              </div>
              <div className="pressureInfo">
                {pressure && (
                  <p>
                    Air Pressure
                    <br />
                    <span className="value">{pressure} hPa</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="error">{error && <p>{error}</p>}</div>
        </div>
      </div>
    </div>
  );
};
