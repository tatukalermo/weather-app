/* eslint-disable no-undef */
import { getTime } from "./App";

describe("Time", () => {
  it("should return formatted time", () => {
    const time = getTime();

    expect(time).to.be.a("string");
  });
});
