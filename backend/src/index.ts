import createError from "http-errors";
import express from "express";
import cors from "cors";
import phonesRouter from "./routes/phone-routes";
import mongoose from "mongoose";

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/phones");
  console.log("Connected to MongoDB");

  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: false }));

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

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
