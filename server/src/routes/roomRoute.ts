import { Router } from "express";
import {verifyToken} from "../middleware/middleware";
import {getRoomById, getTimeTableInfo, createBooking } from "../queries/roomQuery";

const roomRouter = Router();

// get all the resources object from database
roomRouter.get("/", getTimeTableInfo);
roomRouter.post("/roombooking", verifyToken, createBooking)
roomRouter.get("/:id", getRoomById);

export default roomRouter;
