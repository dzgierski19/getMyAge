const AGE_OF_THE_OLDEST_PERSON: number = 123;
const NUMBER_OF_MONTHS_IN_A_YEAR: number = 12;
const CURRENT_YEAR: number = new Date().getFullYear();
const CURRENT_NEW_DATE: Date = new Date();
const NUMBER_OF_DAYS_ON_FEBRUARY: number = 28;
const NUMBER_OF_DAYS_ON_EVEN_MONTH: number = 30;
const NUMBER_OF_DAYS_ON_ODD_MONTH: number = 31;

export const getMyAge = (
  input: string | number | Date,
  currentYear: number = new Date().getFullYear()
) => {
  if (typeof input === "string") {
    return calculateAgeIfInputIsString(input);
  }
  if (input instanceof Date) {
    return getDiffInYears(input);
  }

  return currentYear - getValidYear(input);
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
    "You must provide string with 4 digits (year only) or in full date format"
  );
};

export const getDiffInYearsValidation = (input: Date) => {
  if (
    CURRENT_NEW_DATE.getFullYear() < input.getFullYear() ||
    (CURRENT_NEW_DATE.getFullYear() === input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() < input.getMonth()) ||
    (CURRENT_NEW_DATE.getFullYear() === input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
      CURRENT_NEW_DATE.getDate() < input.getDate())
  ) {
    throw new Error("you are not born");
  } else if (
    (CURRENT_NEW_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON ===
      input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
      CURRENT_NEW_DATE.getDate() > input.getDate()) ||
    (CURRENT_NEW_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON ===
      input.getFullYear() &&
      CURRENT_NEW_DATE.getMonth() > input.getMonth()) ||
    CURRENT_NEW_DATE.getFullYear() - AGE_OF_THE_OLDEST_PERSON >
      input.getFullYear()
  ) {
    throw new Error("You are the oldest");
  }
  return input;
};

const getDiffInDays = (input: Date) => {
  if (CURRENT_NEW_DATE.getDate() < input.getDate()) {
    if (input.getMonth() === 2) {
      return (
        NUMBER_OF_DAYS_ON_FEBRUARY -
        input.getDate() +
        CURRENT_NEW_DATE.getDate()
      );
    } else if (input.getMonth() % 2 === 0) {
      return (
        NUMBER_OF_DAYS_ON_EVEN_MONTH -
        input.getDate() +
        CURRENT_NEW_DATE.getDate()
      );
    } else {
      return (
        NUMBER_OF_DAYS_ON_ODD_MONTH -
        input.getDate() +
        CURRENT_NEW_DATE.getDate()
      );
    }
  }
  return CURRENT_NEW_DATE.getDate() - input.getDate();
};

const getDiffInMonths = (input: Date) => {
  if (
    CURRENT_NEW_DATE.getMonth() < input.getMonth() &&
    getDiffInDays(input) < input.getDate()
  ) {
    return (
      CURRENT_NEW_DATE.getMonth() -
      input.getMonth() +
      NUMBER_OF_MONTHS_IN_A_YEAR +
      ", Days: " +
      getDiffInDays(input)
    );
  } else if (
    CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
    CURRENT_NEW_DATE.getDate() === input.getDate()
  ) {
    return (
      CURRENT_NEW_DATE.getMonth() -
      input.getMonth() +
      ", Days: " +
      getDiffInDays(input)
    );
  } else if (
    CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
    CURRENT_NEW_DATE.getDate() > input.getDate()
  ) {
    return ", Days: " + getDiffInDays(input);
  } else if (
    CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
    CURRENT_NEW_DATE.getDate() < input.getDate()
  ) {
    return NUMBER_OF_MONTHS_IN_A_YEAR - 1 + ", Days: " + getDiffInDays(input);
  } else if (
    CURRENT_NEW_DATE.getMonth() < input.getMonth() &&
    getDiffInDays(input) >= input.getDate()
  ) {
    return (
      NUMBER_OF_MONTHS_IN_A_YEAR -
      (input.getMonth() - CURRENT_NEW_DATE.getMonth()) +
      ", Days: " +
      getDiffInDays(input)
    );
  } else if (
    CURRENT_NEW_DATE.getMonth() >= input.getMonth() &&
    getDiffInDays(input) >= input.getDate()
  ) {
    return (
      CURRENT_NEW_DATE.getMonth() -
      input.getMonth() +
      NUMBER_OF_MONTHS_IN_A_YEAR +
      ", Days: " +
      getDiffInDays(input)
    );
  }
  return (
    CURRENT_NEW_DATE.getMonth() -
    input.getMonth() +
    ", Days: " +
    getDiffInDays(input)
  );
};

const getDiffInYearsWithMonthsAndDays = (input: Date) => {
  getDiffInYearsValidation(input);
  if (
    (CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
      CURRENT_NEW_DATE.getDate() < input.getDate()) ||
    CURRENT_NEW_DATE.getMonth() < input.getMonth()
  ) {
    return (
      "Years: " +
      (CURRENT_NEW_DATE.getFullYear() -
        input.getFullYear() -
        1 +
        ", Months: " +
        getDiffInMonths(input))
    );
  }
  return (
    "Years: " +
    (CURRENT_NEW_DATE.getFullYear() -
      input.getFullYear() +
      ", Months: " +
      getDiffInMonths(input))
  );
};

const getDiffInYears = (input: Date) => {
  getDiffInYearsValidation(input);
  if (
    (CURRENT_NEW_DATE.getMonth() === input.getMonth() &&
      CURRENT_NEW_DATE.getDate() < input.getDate()) ||
    CURRENT_NEW_DATE.getMonth() < input.getMonth()
  ) {
    return CURRENT_NEW_DATE.getFullYear() - input.getFullYear() - 1;
  }
  return CURRENT_NEW_DATE.getFullYear() - input.getFullYear();
};
