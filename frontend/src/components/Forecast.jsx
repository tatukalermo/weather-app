import React from "react";

export class Forecast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      icon,
      temp,
      time,
      icon2,
      temp2,
      time2,
      icon3,
      temp3,
      time3,
    } = this.props.data;

    return (
      <div>
        <div className="forecast">
          <div className="temp1">
            {temp && (
              <p>
                <span className="value">{temp} ºC</span>
              </p>
            )}
          </div>
          <div className="foreIcon1">
            {icon && (
              <img
                width={100}
                height={100}
                alt="weather_icon"
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              />
            )}
          </div>
          <div className="time1">{time && <p>{time}</p>}</div>
          <div className="temp2">
            {temp2 && (
              <p>
                <span className="value">{temp2} ºC</span>
              </p>
            )}
          </div>
          <div className="foreIcon2">
            {icon2 && (
              <img
                width={100}
                height={100}
                alt="weather_icon"
                src={`https://openweathermap.org/img/wn/${icon2}@2x.png`}
              />
            )}
          </div>
          <div className="time2">{time2 && <p>{time2}</p>}</div>
          <div className="temp3">
            {temp3 && (
              <p>
                <span className="value">{temp3} ºC</span>
              </p>
            )}
          </div>
          <div className="foreIcon3">
            {icon3 && (
              <img
                width={100}
                height={100}
                alt="weather_icon"
                src={`https://openweathermap.org/img/wn/${icon3}@2x.png`}
              />
            )}
          </div>
          <div className="time3">{time3 && <p>{time3}</p>}</div>
        </div>
      </div>
    );
  }
}
