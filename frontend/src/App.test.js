/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Weather } from "./components/Weather";

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

  it("Renders 3 <p>", () => {
    const wrapper = shallow(<Weather data={data} />);
    expect(wrapper.find("h1")).to.have.length(1);
  });
});
