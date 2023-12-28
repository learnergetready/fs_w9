import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, SafePatient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
    return patients;
};

const findPatient = (theId: string): Patient | undefined => {
    return patients.find(patient => patient.id === theId);
};

const safeGetPatients = (): SafePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const id: string = uuid();
    const readyPatient = {
        id,
        ...newPatient,
    };
    patients.push(readyPatient);
    return readyPatient;
};

export default { getPatients, findPatient, safeGetPatients, addPatient };