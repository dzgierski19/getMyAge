const AGE_OF_THE_OLDEST_PERSON: number = 123;
const NUMBER_OF_MONTHS_IN_A_YEAR: number = 12;
const CURRENT_YEAR: number = new Date().getFullYear();
const CURRENT_NEW_DATE: Date = new Date();
const CURRENT_DATE = new Date(2023, 5, 3);
const NUMBER_OF_DAYS_ON_FEBRUARY: number = 28;
const NUMBER_OF_DAYS_ON_EVEN_MONTH: number = 30;
const NUMBER_OF_DAYS_ON_ODD_MONTH: number = 31;

console.log(CURRENT_DATE);

const getMyAge = (input: string | number | Date) => {
  if (typeof input === "string") {
    return calculateAgeIfInputIsString(input);
  }
  if (input instanceof Date) {
    return getDiffInYears(input);
  }

  return CURRENT_YEAR - getValidYear(input);
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

const isInputInteger = (input: number) => {
  if (!Number.isInteger(input)) {
    throw new Error("You must provide Integer");
  }
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
    return getDiffInYears(new Date(input));
  }
  throw new Error(
    "You must provide string with 4 digits or in full date format"
  );
};

//DATE

const getDiffInYearsValidation = (input: Date) => {
  if (
    CURRENT_DATE.getFullYear() < input.getFullYear() ||
    (CURRENT_DATE.getFullYear() === input.getFullYear() &&
      CURRENT_DATE.getMonth() < input.getMonth()) ||
    (CURRENT_DATE.getFullYear() === input.getFullYear() &&
      CURRENT_DATE.getMonth() === input.getMonth() &&
      CURRENT_DATE.getDate() < input.getDate())
  ) {
    throw new Error("you are not born");
  } else if (
    (CURRENT_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON ===
      input.getFullYear() &&
      CURRENT_DATE.getMonth() === input.getMonth() &&
      CURRENT_DATE.getDate() > input.getDate()) ||
    (CURRENT_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON ===
      input.getFullYear() &&
      CURRENT_DATE.getMonth() > input.getMonth()) ||
    CURRENT_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON > input.getFullYear()
  ) {
    throw new Error("You are the oldest");
  }
  return input;
};

const getDiffInDays = (input: Date) => {
  if (CURRENT_DATE.getDate() < input.getDate()) {
    if (input.getMonth() === 2) {
      return (
        NUMBER_OF_DAYS_ON_FEBRUARY - input.getDate() + CURRENT_DATE.getDate()
      );
    } else if (input.getMonth() % 2 === 0) {
      return (
        NUMBER_OF_DAYS_ON_EVEN_MONTH - input.getDate() + CURRENT_DATE.getDate()
      );
    } else {
      return (
        NUMBER_OF_DAYS_ON_ODD_MONTH - input.getDate() + CURRENT_DATE.getDate()
      );
    }
  }
  return CURRENT_DATE.getDate() - input.getDate();
};

console.log(getDiffInDays(new Date(1990, 3, 1)));

const getDiffInMonths = (input: Date) => {
  if (
    CURRENT_DATE.getMonth() < input.getMonth() &&
    getDiffInDays(input) < input.getDate()
  ) {
    return (
      CURRENT_DATE.getMonth() -
      input.getMonth() +
      NUMBER_OF_MONTHS_IN_A_YEAR +
      ", Days: " +
      getDiffInDays(input)
    );
  } else if (
    CURRENT_DATE.getMonth() === input.getMonth() &&
    CURRENT_DATE.getDate() === input.getDate()
  ) {
    return (
      CURRENT_DATE.getMonth() -
      input.getMonth() +
      ", Days: " +
      getDiffInDays(input)
    );
  } else if (
    CURRENT_DATE.getMonth() === input.getMonth() &&
    CURRENT_DATE.getDate() > input.getDate()
  ) {
    return ", Days: " + getDiffInDays(input);
  } else if (
    CURRENT_DATE.getMonth() === input.getMonth() &&
    CURRENT_DATE.getDate() < input.getDate()
  ) {
    return NUMBER_OF_MONTHS_IN_A_YEAR - 1 + ", Days: " + getDiffInDays(input);
  } else if (
    CURRENT_DATE.getMonth() < input.getMonth() &&
    getDiffInDays(input) >= input.getDate()
  ) {
    return (
      NUMBER_OF_MONTHS_IN_A_YEAR -
      (input.getMonth() - CURRENT_DATE.getMonth()) +
      ", Days: " +
      getDiffInDays(input)
    );
  } else if (
    CURRENT_DATE.getMonth() >= input.getMonth() &&
    getDiffInDays(input) >= input.getDate()
  ) {
    return (
      CURRENT_DATE.getMonth() -
      input.getMonth() +
      NUMBER_OF_MONTHS_IN_A_YEAR +
      ", Days: " +
      getDiffInDays(input)
    );
  }
  return (
    CURRENT_DATE.getMonth() -
    input.getMonth() +
    ", Days: " +
    getDiffInDays(input)
  );
};

console.log(getDiffInMonths(new Date(1990, 7, 9)));

const getDiffInYearsWithMonthsAndDays = (input: Date) => {
  getDiffInYearsValidation(input);
  if (
    (CURRENT_DATE.getMonth() === input.getMonth() &&
      CURRENT_DATE.getDate() < input.getDate()) ||
    CURRENT_DATE.getMonth() < input.getMonth()
  ) {
    return (
      "Years: " +
      (CURRENT_DATE.getFullYear() -
        input.getFullYear() -
        1 +
        ", Months: " +
        getDiffInMonths(input))
    );
  }
  return (
    "Years: " +
    (CURRENT_DATE.getFullYear() -
      input.getFullYear() +
      ", Months: " +
      getDiffInMonths(input))
  );
};

console.log(getDiffInYearsWithMonthsAndDays(new Date(1900, 6, 3)));

const getDiffInYears = (input: Date) => {
  getDiffInYearsValidation(input);
  if (
    (CURRENT_DATE.getMonth() === input.getMonth() &&
      CURRENT_DATE.getDate() < input.getDate()) ||
    CURRENT_DATE.getMonth() < input.getMonth()
  ) {
    return CURRENT_DATE.getFullYear() - input.getFullYear() - 1;
  }
  return CURRENT_DATE.getFullYear() - input.getFullYear();
};

console.log(getDiffInYears(new Date(1900, 5, 12)));

//

const result1 = getMyAge(new Date(2022, 5, 1));
console.log(result1);
const result2 = getMyAge(1993);
console.log(result2);
const result3 = getDiffInYearsWithMonthsAndDays(new Date(1900, 6, 1));
console.log(result3);
const result33 = getDiffInYears(new Date(1900, 5, 4));
console.log(result33);
const result4 = getMyAge("1901/04/14");
console.log(result4);
const result5 = getMyAge(new Date(2023, 3, 31));
console.log(result5);
const result6 = getMyAge("1900/06/01");
console.log(result6);
