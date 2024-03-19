import { Router } from "express";

import TimeTable from '../controllers/TimeTable'

const roomRouter = Router();

// get all the resources object from database
roomRouter.get("/", TimeTable.getTimeTableInfo);

export default roomRouter;
