import { NewPatient, Gender, NewEntry, HealthCheckRating, Diagnosis, Discharge, SickLeave } from "./types";

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

const parseString = (something: unknown, dataType: string = "data"): string => {
    if (!something || !isString(something)) {
        throw new Error("Incorrect or missing " + dataType);
    }
    return something;
};

const parseDate = (something: unknown, dataType: string = "date"): string => {
    if (!something || !isString(something) || !isDate(something)) {
        throw new Error("Incorrect or missing " + dataType);
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
            dateOfBirth: parseDate(obj.dateOfBirth, "DOB"),
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
const isNumber = (something: unknown): something is number => {
    return typeof something === "number" || something instanceof Number;
};

const isHealthCheckRating = (something: number): something is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(something);
};

const parseHealthCheckRating = (something: unknown): HealthCheckRating => {
    if (!isNumber(something) || !isHealthCheckRating(something)) {
        throw new Error("Incorrect or missing health check rating.");
    }
    return something;
};

const parseDischarge = (object: unknown): Discharge => {
    if (!object || typeof object !== 'object' || !('date' in object) || !("criteria" in object)) {
        throw new Error("Incorrect or missing discharge information.");
    }
    if (typeof object.date !== "string" || typeof object.criteria !== "string") {
        throw new Error("Incorrect or missing discharge information.");
    }
    return object as Discharge;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if (!object || typeof object !== 'object' || !('startDate' in object) || !("endDate" in object)) {
        throw new Error("Incorrect or missing sick leave information.");
    }
    const parsedSickleave: SickLeave = {
        startDate: parseDate(object.startDate),
        endDate: parseDate(object.endDate)
    };
    return parsedSickleave;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        // we will just trust the data to be in correct form
        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (obj: unknown): NewEntry => {
    if (!obj || typeof obj !== 'object') {
        throw new Error("Incorrect or missing data");
    }

    if (!("type" in obj) || typeof obj.type !== "string" || !("date" in obj) || !("specialist" in obj) || !("description" in obj)) {
        throw new Error("Incorrect or missing fields");
    }

    switch (obj.type) {
        case "HealthCheck":
            if ("healthCheckRating" in obj) {
                const newEntry: NewEntry = {
                    date: parseDate(obj.date),
                    specialist: parseString(obj.specialist, "specialist"),
                    description: parseString(obj.description, "description"),
                    healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
                    type: obj.type,
                };
                if ("diagnosisCodes" in obj) {
                    newEntry.diagnosisCodes = parseDiagnosisCodes(obj); //this is a trusting parser
                }
                return newEntry;
            }
            throw new Error("Incorrect or missing data");
        case "Hospital":
            if ("discharge" in obj) {
                const newEntry: NewEntry = {
                    date: parseDate(obj.date),
                    specialist: parseString(obj.specialist, "specialist"),
                    description: parseString(obj.description, "description"),
                    discharge: parseDischarge(obj.discharge),
                    type: obj.type,
                };
                if ("diagnosisCodes" in obj) {
                    newEntry.diagnosisCodes = parseDiagnosisCodes(obj); //this is a trusting parser
                }
                return newEntry;
            }
            throw new Error("Incorrect or missing data");
        case "OccupationalHealthcare":
            if ("employerName" in obj) {
                const newEntry: NewEntry = {
                    date: parseDate(obj.date),
                    specialist: parseString(obj.specialist, "specialist"),
                    description: parseString(obj.description, "description"),
                    employerName: parseString(obj.employerName, "employer name"),
                    type: obj.type,
                };
                if ("sickLeave" in obj) {
                    newEntry.sickLeave = parseSickLeave(obj.sickLeave);
                }
                if ("diagnosisCodes" in obj) {
                    newEntry.diagnosisCodes = parseDiagnosisCodes(obj); //this is a trusting parser
                }
                return newEntry;
            }
            throw new Error("Incorrect or missing data");
        default:
            throw new Error("Unrecognized entry type.");
    }
    throw new Error("Incorrect or missing data");
};