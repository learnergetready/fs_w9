import { NewPatient, Gender } from "./types";

const isString = (something: unknown): something is string => {
    return typeof something === "string" || something instanceof String;
};

const isDate = (something: string): boolean => {
    return Boolean(Date.parse(something));
};

const isGender = (something: string): something is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(something);
};

const parseString = (something: unknown): string => {
    if (!something || !isString(something)) {
        throw new Error("Incorrect or missing data");
    }
    return something;
};

const parseDOB = (something: unknown): string => {
    if (!something || !isString(something) || !isDate(something)) {
        throw new Error("Incorrect or missing DOB");
    }
    return something;
};

const parseGender = (something: unknown): Gender => {
    if (!something || !isString(something) || !isGender(something)) {
        throw new Error("Incorrect or missing gender");
    }
    return something;
};

export const toNewPatient = (obj: unknown): NewPatient => {
    if (!obj || typeof obj !== 'object') {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in obj && "dateOfBirth" in obj && "ssn" in obj && "gender" in obj && "occupation" in obj) {
        const newPatient: NewPatient = {
            name: parseString(obj.name),
            dateOfBirth: parseDOB(obj.dateOfBirth),
            ssn: parseString(obj.ssn),
            gender: parseGender(obj.gender),
            occupation: parseString(obj.occupation)
        };
        return newPatient;
    }
    throw new Error("Incorrect or missing data");
};