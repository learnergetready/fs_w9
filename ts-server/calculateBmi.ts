import { isNumber } from "./utils";

interface HeightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): HeightWeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const parseQueryString = (height: any, weight: any): HeightWeight => {
  if (String(height) && String(weight)) {
    return parseArguments(["a", "b", String(height), String(weight)]);
  }
  throw new Error("Was not able to parse arguments.");
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);
  if (bmi < 16.0) return "Underweight (Severe thinness)";
  if (bmi < 17.0) return "Underweight (Moderate thinness)";
  if (bmi < 18.5) return "Underweight (Mild thinness)";
  if (bmi < 25.0) return "Normal range";
  if (bmi < 30.0) return "Overweight (Pre-obese)";
  if (bmi < 35.0) return "Obese (Class I)";
  if (bmi < 40.0) return "Obese (Class II)";
  return "Obese (Class III)";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
