const getMyAge = (input: string | number | Date) => {
  const stringNumbered = inputToNumber(input);
  const ageOfTheOldestPersonEverAlive = 123;
  if (
    new Date().getFullYear() - stringNumbered >
    ageOfTheOldestPersonEverAlive
  ) {
    throw new Error("You are the oldest person in the world");
  }
  return new Date().getFullYear() - stringNumbered;
};

const inputToNumber = (input: string | number | Date) => {
  if (typeof input === "string") {
    return Number(input);
  } else if (typeof input === "object") {
    if (Object.prototype.toString.call(input) === "[object Date]") {
      //   return dateComparsion(new Date(), input);
      return input.getFullYear();
    } else throw new Error("Please provide object as a Date");
  }
  return input;
};

// const dateComparsion = (input1: Date, input2: Date) => {
//   return input1.getFullYear() - input2.getFullYear();
// };

const result1 = getMyAge(new Date(1999, 1, 1));
console.log(result1);
const result2 = getMyAge(1920);
console.log(result2);

// const result1 = getMyAge(new Date(1990, 1, 1));
// const result2 = getMyAge("1990");
// const result3 = getMyAge(1990);

// wyniki result1, result2 i result3 mają być identyczne
