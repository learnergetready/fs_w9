import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = () => {
    return axios.get<Diary[]>(baseUrl)
        .then(response => response.data);
};

const post = (newEntry: NewDiaryEntry) => {
    return axios.post<Diary>(baseUrl, newEntry)
        .then(response => response.data)
}

export default { getAll, post };