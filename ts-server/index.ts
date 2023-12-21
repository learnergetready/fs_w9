import express from "express";
import {
  calculateBmi,
  parseQueryString as parseBmiArguments,
} from "./calculateBmi";
import {
  calculateExcercises,
  parseJSONarguments as parseExerciseArguments,
} from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, weight } = parseBmiArguments(
      req.query.height,
      req.query.weight
    );
    const bmi = calculateBmi(height, weight);
    res.send({ weight, height, bmi });
  } catch (_error) {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { target, exercises } = parseExerciseArguments(req.body);
    const results = calculateExcercises(exercises, target);
    res.send(results);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "parameters missing") {
        res.status(400).send({ error: "parameters missing" });
      } else {
        res.status(400).send({ error: "malformatted parameters" });
      }
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
