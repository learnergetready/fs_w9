import express from "express";
import patienService from "../services/patientService";
import { NewPatient } from "../types";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patienService.safeGetPatients());
});

router.post("/", (req, res) => {
    try {
        const newPatient: NewPatient = toNewPatient(req.body);
        const addedPatient = patienService.addPatient(newPatient);
        res.send(addedPatient);
    } catch (error) {
        let errorMessage = "Something bad happened.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;