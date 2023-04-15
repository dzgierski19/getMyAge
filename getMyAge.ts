const AGE_OF_THE_OLDEST_PERSON: number = 123;
const CURRENT_YEAR: number = new Date().getFullYear();

const getMyAge = (input: string | number | Date) => {
  const inputTypeNumbered = checkAndConvertInputToNumber(input);
  if (CURRENT_YEAR - inputTypeNumbered > AGE_OF_THE_OLDEST_PERSON) {
    throw new Error("You are the oldest person in the world");
  }
  return CURRENT_YEAR - inputTypeNumbered;
};

const checkAndConvertInputToNumber = (input: string | number | Date) => {
  if (typeof input === "string") {
    return changeStringToNumberOrDate(input);
  }
  if (input instanceof Date) {
    return getValidYear(input.getFullYear());
  }
  return getValidYear(input);
};

const changeStringToNumberOrDate = (input: string) => {
  if (/^\d{4}$/.test(input) === true) {
    return getValidYear(Number(input));
  } else if (
    /^\d{4}[ ]\d{2}[ ]\d{2}$/.test(input) === true ||
    /^\d{4}[.]\d{2}[.]\d{2}$/.test(input) === true ||
    /^\d{4}[/]\d{2}[/]\d{2}$/.test(input) === true ||
    /^\d{4}[-]\d{2}[-]\d{2}$/.test(input) === true
  ) {
    return getValidYear(Number(input.slice(0, 4)));
  }
  throw new Error(
    "You must provide string with 4 digits or in full date format"
  );
};

const getValidYear = (input: number) => {
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
const result3 = getMyAge("1900/00/11");
console.log(result3);

// DODAĆ DATE I STRING DODATKOWE WYTYCZNE
// dodać dzień i miesiąc
// string RRRR-. /MM-. /DD
