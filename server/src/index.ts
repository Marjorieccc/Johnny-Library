import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import router from './routes/resourceRoute';
import { config } from "./config/config";
import Logging from "./logging/logging";

const app = express();

(async () => {
  try {
    console.log(config.mongo.url);
    await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' });
    Logging.info('Mongo connected successfully.');
  } catch (error) {
    Logging.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
})();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to libralounge server");
});

app.use('/', router);

app.listen(config.server.port, () => {
  Logging.info(`Server is running on port ${config.server.port}`);
});