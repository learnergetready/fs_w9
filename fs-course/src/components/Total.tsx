import { CoursePart } from "../data/courseParts";

const Total = ({courseParts}: {courseParts:CoursePart[]}) => {
    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return <p>
    <b>Number of exercises {totalExercises}</b>
  </p>;
};

export default Total;