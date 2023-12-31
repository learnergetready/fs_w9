import { isNumber } from "./utils";

type rating = 1 | 2 | 3;
type ratingDescription =
  | "bad"
  | "not too bad but could be better"
  | "excellent";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: ratingDescription;
  target: number;
  average: number;
}

interface ParsedArguments {
  target: number;
  exercises: number[];
}

interface unParsedArguments {
  target: unknown;
  daily_exercises: unknown[];
}

const parseArguments = (args: string[]): ParsedArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const [_reject1, _reject2, target, ...excercises] = args;

  if (isNumber(target) && excercises.every((arg) => isNumber(arg))) {
    return {
      target: Number(target),
      exercises: excercises.map((arg) => Number(arg)),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const parseJSONarguments = ({
  daily_exercises,
  target,
}: unParsedArguments): ParsedArguments => {
  if (!daily_exercises || !target) {
    throw new Error("parameters missing");
  }
  if (daily_exercises.every((arg) => String(arg)) && String(target)) {
    return parseArguments(
      ["a", "b", String(target)].concat(
        daily_exercises.map((arg) => String(arg))
      )
    );
  }
  throw new Error("Was not able to parse arguments.");
};

export const calculateExcercises = (
  excercises: number[],
  target: number
): Result => {
  const sumReducer = (acc: number, current: number): number => acc + current;
  const rate = (average: number, target: number): rating => {
    if (average / target < 0.4) return 1;
    if (average / target < 1.0) return 2;
    return 3;
  };
  const describeRating = (rating: rating): ratingDescription => {
    switch (rating) {
      case 1:
        return "bad";
      case 2:
        return "not too bad but could be better";
      case 3:
        return "excellent";
      default:
        throw new Error("Cannot describe that rating.");
    }
  };
  const periodLength = excercises.length;
  const trainingDays = excercises.filter((hours) => hours !== 0).length;
  const average = excercises.reduce(sumReducer, 0) / periodLength;
  const success = average >= target;
  const rating = rate(average, target);
  const ratingDescription = describeRating(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};
if (require.main === module) {
  try {
    const { target, exercises } = parseArguments(process.argv);
    console.log(calculateExcercises(exercises, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}