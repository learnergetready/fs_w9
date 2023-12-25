export interface CoursePartsProps {
    name: string;
    exerciseCount: number;
}

const Content = ({courseParts}: {courseParts:CoursePartsProps[]}) => {
    return courseParts.map(p => <p key={p.name}>{p.name} {p.exerciseCount}</p>)
}

export default Content