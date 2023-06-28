import { getMyAge } from "../app/getMyAge";
import { iterableEquality } from "@jest/expect-utils";

describe("getMyAge test suite", () => {
  describe("testing input as date", () => {
    it("should return proper age when valid date provided", () => {
      const result = getMyAge(new Date(1900, 6, 15));
      expect(result).toBe(122);
    });
  });
  describe("testing input as number", () => {
    it("should return proper age when valid year provided as number", () => {
      const result = getMyAge(2000);
      expect(result).toBe(23);
    });
  });
  describe("testing input as String", () => {
    it("should return proper age when valid year provided as string", () => {
      const result = getMyAge("2000 06 30");
      expect(result).toBe(22);
    });
  });
  describe("should throw error when", () => {
    it("- date is over 123 years ago", () => {
      function expectError() {
        getMyAge(new Date(1900, 5, 1));
      }
      expect(expectError).toThrow();
    });
    it("- date is from the future", () => {
      function expectError() {
        getMyAge(new Date(2024, 5, 1));
      }
      expect(expectError).toThrow();
    });
    it("- provided number and current year's difference is more than 123", () => {
      function expectError() {
        getMyAge(1899);
      }
      expect(expectError).toThrow();
    });
    it("- provided year as number is from the future", () => {
      function expectError() {
        getMyAge(2024);
      }
      expect(expectError).toThrow();
    });
    it("- provided number is not Integer", () => {
      function expectError() {
        getMyAge(2022.5);
      }
      expect(expectError).toThrow();
    });
    it("- provided invalid string input", () => {
      function expectError() {
        getMyAge("19999 22 22");
      }
      expect(expectError).toThrow();
    });
    it("- provided string input that is not number", () => {
      function expectError() {
        getMyAge("date");
      }
      expect(expectError).toThrow();
    });
  });
});
