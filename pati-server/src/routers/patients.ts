import express from "express";
import patienService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patienService.safeGetPatients());
});

export default router;