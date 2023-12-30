import { NewPatient, Gender, NewEntry } from "./types";

// Omit for type unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Patient parser
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
            occupation: parseString(obj.occupation),
            entries: [],
        };
        return newPatient;
    }
    throw new Error("Incorrect or missing data");
};

// Entry parser
/*const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};*/

const healthCheckRequiredFields = ["description", "date", "specialist", "healthCheckRating"];
const hospitalEntryRequiredFields = ["description", "date", "specialist", "discharge"];
const occupationalRequiredFields = ["description", "date", "specialist", "employerName"];

export const toNewEntry = (obj: unknown): NewEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error("Incorrect or missing data");
    }

    if ("type" in obj && typeof obj.type === "string") {
        switch (obj.type) { // could I get exhaustive type checking if i checked common fields incl. type before switch?
            case "HealthCheck":
                if (healthCheckRequiredFields.every(k => k in obj)) {
                    return obj as NewEntry; // TODO imprement parsing, remember parseDiagnosisCodes
                }
                throw new Error("Incorrect or missing data");
            case "Hospital":
                if (hospitalEntryRequiredFields.every(k => k in obj)) {
                    return obj as NewEntry; // TODO imprement parsing, remember parseDiagnosisCodes
                }
                throw new Error("Incorrect or missing data");
            case "OccupationalHealthcare":
                if (occupationalRequiredFields.every(k => k in obj)) {
                    return obj as NewEntry; // TODO imprement parsing, remember parseDiagnosisCodes
                }
                throw new Error("Incorrect or missing data");
            default:
                throw new Error("Unrecognized entry type.");
        }
    }
    //return obj as NewEntry;
    throw new Error("Incorrect or missing data");
};