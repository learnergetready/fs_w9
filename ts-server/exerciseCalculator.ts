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

const calculateExcercises = (excercises: number[], target: number): Result => {
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
        return "bad";
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

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 2));
