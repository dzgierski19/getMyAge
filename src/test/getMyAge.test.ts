import { it } from "node:test";
import {
  getDiffInYears,
  getDiffInYearsValidation,
  getMyAge,
} from "../app/getMyAge";
import { iterableEquality } from "@jest/expect-utils";

// const myFun(){
//   return "5"
// }

// let x: number = 0

// beforeAll
// afterAll

// afterEach

// describe("Name of the group", () => {

//   beforeEach(()=>{
//     x = 0
//   })

//   it("should return 5", () => {
//     x+1
//     expect(myFun()).toBe(5);
//     expect(x).toBe(1)
//   });

//   it("should return 5", () => {
//     x+2
//     expect(myFun()).toBe(5);
//     expect(x).toBe(2)
//   });
// });

describe("getMyAge", () => {
  test("should return proper age", () => {
    const result = getMyAge(new Date(1900, 6, 12));
    expect(result).toBe(122);
  });
  test("should return proper age", () => {
    const result = getMyAge(2000);
    expect(result).toBe(23);
  });
  test("should throw error on invalid age", () => {
    function expectError() {
      getMyAge(new Date(1900, 5, 1));
    }
    expect(expectError).toThrow();
  });
  test("should throw error on invalid input", () => {
    function expectError() {
      getMyAge("19999, 22, 22");
    }
    expect(expectError).toThrow();
  });
});

//skip pomija test
//jeden describe na dobre wyniki i na zle wyniki
