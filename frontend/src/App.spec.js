// import { expect } from "chai";
import { getTime } from "./App";

describe("Time", () => {
  it("should return formatted time", () => {
    const time = getTime();

    // eslint-disable-next-line no-undef
    expect(time).to.be.a("string");
  });
});
