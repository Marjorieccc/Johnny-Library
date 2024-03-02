import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/resourceRoute';
const app = express();
const port = 8080;
const mongoDBURL = "mongodl link";

(async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log("MongoDB Connected!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
})();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("welcome to libralounge server");
});

app.use('/resources', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});