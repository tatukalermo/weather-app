/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Weather } from "./components/Weather";
import { Forecast } from "./components/Forecast";

describe("Weather Component", () => {
  const data = {
    icon: "04d",
    temp: 17,
    humidity: 97,
    pressure: 1002,
    weather: "rain",
    updatedAt: "21:00",
    location: "London",
  };

  it("Renders 5 <img>", () => {
    const wrapper = shallow(<Weather data={data} />);
    expect(wrapper.find("img")).to.have.length(5);
  });

  it("Renders 1 <h1>", () => {
    const wrapper = shallow(<Weather data={data} />);
    expect(wrapper.find("h1")).to.have.length(1);
  });

  it("Renders 5 <p>", () => {
    const wrapper = shallow(<Weather data={data} />);
    expect(wrapper.find("p")).to.have.length(5);
  });
});

describe("Forecast Component", () => {
  const data = {
    icon: "04d",
    temp: 15,
    time: "17:00",
    icon2: "04d",
    temp2: 14,
    time2: "20:00",
    icon3: "04d",
    temp3: 13,
    time3: "23:00",
  };

  it("Renders 3 <img>", () => {
    const wrapper = shallow(<Forecast data={data} />);
    expect(wrapper.find("img")).to.have.length(3);
  });

  it("Renders 6 <p>", () => {
    const wrapper = shallow(<Forecast data={data} />);
    expect(wrapper.find("p")).to.have.length(6);
  });
});
