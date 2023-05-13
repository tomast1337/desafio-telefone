import createError from "http-errors";
import express from "express";
import cors from "cors";
import phonesRouter from "./routes/phone-routes";
import mongoose from "mongoose";

//get env variable from docker-compose.yml

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/phones";

const main = async () => {
  console.log("Connecting to", MONGODB_URI);
  await mongoose.connect(MONGODB_URI, {});
  console.log("Connected to MongoDB");

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  // serve static files from the React frontend app, and images
  app.use(express.static("public"));

  app.use("/phones", phonesRouter);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  app.use(function (req, res, next) {
    next(createError(404));
  });
};

main();
