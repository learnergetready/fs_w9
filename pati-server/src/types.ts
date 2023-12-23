export type Diagnose = {
    code: string,
    name: string,
    latin?: string
};

type Gender =
    | "male"
    | "female"
    | "other";

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
};

export type SafePatient = Omit<Patient, "ssn">;