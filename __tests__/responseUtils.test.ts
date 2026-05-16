import { NasaResponseUtils } from "../src/utils/NasaResponseUtils";
import { describe, beforeAll, it, expect } from "vitest";
type Visitor = {
  amount: number
}

describe("ResponseUtils test case", () => {
  let responseUtils: NasaResponseUtils;
  function getAllVisitors(vis: Visitor): number {
    vis.amount = 123;
    return vis.amount; 
  }

  beforeAll(() => {
    responseUtils = new NasaResponseUtils();
  });

  it("Should transform response: ", () => {
    const res = {
      data: {
        element_count: 10
      }
    };
    const am = getAllVisitors({ amount: 555 })
    console.log("some ", am);
    const meteors = responseUtils.countVisibleMeteors(res);

    expect(meteors).toHaveProperty("amount", 10);
    expect(meteors).toEqual({
      amount: 10
    });
    expect(meteors).toBeDefined();
  });
});
