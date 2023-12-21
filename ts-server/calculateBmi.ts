interface HeightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): HeightWeight => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ^ 2);
  if (bmi < 16.0) return "Underweight (Severe thinness) ";
  if (bmi < 17.0) return "Underweight (Moderate thinness) ";
  if (bmi < 18.5) return "Underweight (Mild thinness) ";
  if (bmi < 25.0) return "Normal range ";
  if (bmi < 30.0) return "Overweight (Pre-obese) ";
  if (bmi < 35.0) return "Obese (Class I) ";
  if (bmi < 40.0) return "Obese (Class II) ";
  return "Obese (Class III) ";
};

try {
  //const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(180, 74));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
