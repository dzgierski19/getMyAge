const AGE_OF_THE_OLDEST_PERSON: number = 123;
const CURRENT_YEAR: number = new Date().getFullYear();

const getMyAge = (input: string | number | Date) => {
  const inputTypeNumbered = checkInputType(input);
  if (CURRENT_YEAR - inputTypeNumbered > AGE_OF_THE_OLDEST_PERSON) {
    throw new Error("You are the oldest person in the world");
  }
  return CURRENT_YEAR - inputTypeNumbered;
};

const checkInputType = (input: string | number | Date) => {
  if (typeof input === "string") {
    return changeStringToNumber(input);
  }
  if (input instanceof Date) {
    return isNumberMoreThanCurrentYear(input.getFullYear());
  }
  return isNumberMoreThanCurrentYear(input);
};

const changeStringToNumber = (input: string) => {
  if (/^\d{4}$/.test(input) !== true) {
    throw new Error("You must provide string with 4 digits");
  }
  return isNumberMoreThanCurrentYear(Number(input));
};

const isNumberMoreThanCurrentYear = (input: number) => {
  isInputInteger(input);
  if (input > CURRENT_YEAR) {
    throw new Error("You are not born yet");
  }
  return input;
};

const isInputInteger = (input: number) => {
  if (!Number.isInteger(input)) {
    throw new Error("You must provide Integer");
  }
};

const result1 = getMyAge(new Date(2023, 1, 1));
console.log(result1);
const result2 = getMyAge(1993);
console.log(result2);
const result3 = getMyAge("1902");
console.log(result3);
