/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import { Weather } from "./components/Weather";

describe("Component: App", () => {
  it("renders the Weather wrapper ", () => {
    const wrapper = shallow(<Weather />);
    expect(wrapper.find(Weather)).to.have.lengthOf(1);
  });
});
