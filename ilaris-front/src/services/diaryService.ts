import axios from "axios";
import { Diary, NewDiaryEntry } from "../types";
const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
    const response = await axios.get<Diary[]>(baseUrl);
    return response.data;
};

const post = async (newEntry: NewDiaryEntry, notify: (message: string) => void) => {
    try {
        const response = await axios.post<Diary>(baseUrl, newEntry);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            notify(error.response?.data);
            return ("error");
        }
    }
};

export default { getAll, post };