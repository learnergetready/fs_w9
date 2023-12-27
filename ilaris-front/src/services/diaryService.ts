import axios from "axios";
import { Diary } from "../types";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
    return axios.get<Diary[]>(baseUrl)
        .then(response => response.data);
};

export default { getAll };