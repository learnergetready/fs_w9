import { CoursePartsProps } from "./Content"

const Total = ({courseParts}: {courseParts:CoursePartsProps[]}) => {
    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return <p>
    <b>Number of exercises {totalExercises}</b>
  </p>
}

export default Total