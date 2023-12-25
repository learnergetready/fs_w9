import { CoursePart } from "../data/courseParts";
import Part from "./Part";

const Content = ({courseParts}: {courseParts:CoursePart[]}) => {
    return courseParts.map(p => <Part key={p.name} p={p} />);
};

export default Content;