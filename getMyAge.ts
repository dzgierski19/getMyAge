const AGE_OF_THE_OLDEST_PERSON: number = 123;
const CURRENT_YEAR: number = new Date().getFullYear();
const CURRENT_DATE: number =
  (new Date().getTime() + 1970 * (1000 * 60 * 60 * 24 * 365.25)) /
  (1000 * 60 * 60 * 24 * 365.25);

console.log(CURRENT_DATE);

const getMyAge = (input: string | number | Date) => {
  if (typeof input === "string") {
    return calculateAgeIfInputIsString(input);
  }
  if (input instanceof Date) {
    const differenceFromCurrentDateToTypedDate =
      CURRENT_DATE - getDifferenceInYearsFromDate(input);
    return Math.floor(differenceFromCurrentDateToTypedDate);
  }

  return CURRENT_YEAR - getValidYear(input);
};

const calculateAgeIfInputIsString = (input: string) => {
  if (/^\d{4}$/.test(input) === true) {
    return CURRENT_YEAR - getValidYear(Number(input));
  } else if (
    /^\d{4}[ ]\d{2}[ ]\d{2}$/.test(input) ||
    /^\d{4}[.]\d{2}[.]\d{2}$/.test(input) ||
    /^\d{4}[/]\d{2}[/]\d{2}$/.test(input) ||
    /^\d{4}[-]\d{2}[-]\d{2}$/.test(input)
  ) {
    const yearDifference =
      CURRENT_DATE - getDifferenceInYearsFromDate(new Date(input));
    return Math.floor(yearDifference);
  }
  throw new Error(
    "You must provide string with 4 digits or in full date format"
  );
};

const getDifferenceInYearsFromDate = (input: Date) => {
  const differenceInYearsIncludingDayAndMonth = Math.floor(
    (new Date().getTime() - input.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  getValidYear(CURRENT_YEAR - differenceInYearsIncludingDayAndMonth);
  return CURRENT_DATE - differenceInYearsIncludingDayAndMonth;
};

const getValidYear = (input: number) => {
  isInputInteger(input);
  if (input > CURRENT_YEAR) {
    throw new Error("You are not born yet");
  } else if (CURRENT_YEAR - input > AGE_OF_THE_OLDEST_PERSON) {
    throw new Error("You are the oldest person in the world");
  }
  return input;
};

// //wrzucic calosc do getValidYear lub checkIfValidYEar

// const checkIfValidYear = (input: number) => {
//   // isInputInteger(input);
//   if (input > AGE_OF_THE_OLDEST_PERSON) {
//     throw new Error("You are the oldest person in the world");
//   } else if (0 > input) {
//     throw new Error("You are not born yet");
//   }
// };

const isInputInteger = (input: number) => {
  if (!Number.isInteger(input)) {
    throw new Error("You must provide Integer");
  }
};

const result1 = getMyAge(new Date(2022, 4, 1));
console.log(result1);
const result2 = getMyAge(1993);
console.log(result2);
const result3 = getMyAge("1900/06/16");
console.log(result3);
const result4 = getMyAge("1900/04/14");
console.log(result4);
const result5 = getMyAge(new Date(2023, 3, 15));
console.log(result5);

// DODAĆ DATE I STRING DODATKOWE WYTYCZNE
// dodać dzień i miesiąc
// string RRRR-. /MM-. /DD
