import express from "express";
import {
  calculateBmi,
  parseQueryString as parseBmiArguments,
} from "./calculateBmi";

const app = express();

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
    res.json({ weight, height, bmi });
  } catch (_error) {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
