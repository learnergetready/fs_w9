import { CoursePart } from "../data/courseParts";
import { assertNever } from "../utils";

const Part = ({p} : {p:CoursePart}) => {
        switch (p.kind) {
            case "basic":
                return <p>name: <b>{p.name}</b><br/>exercise count: {p.exerciseCount}<br/>description: {p.description}</p>;
            case "group":
                return <p>name: <b>{p.name}</b><br/>exercise count: {p.exerciseCount}<br/>group project count: {p.groupProjectCount}</p>;
            case "background":
                return <p>name: <b>{p.name}</b><br/>exercise count: {p.exerciseCount}<br/>description: {p.description}<br/>background material: <a href={p.backgroundMaterial}>{p.backgroundMaterial}</a></p>;
            case "special":
                return <p>name: <b>{p.name}</b><br/>exercise count: {p.exerciseCount}<br/>description: {p.description}<br/>requirements: {p.requirements.reduce((acc, req) => acc.concat(", "+req))}</p>;
            default:
                return assertNever(p);
        }
};

export default Part;