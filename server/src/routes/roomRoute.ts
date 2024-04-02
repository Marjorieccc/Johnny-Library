import { Router } from "express";
import {getRoomById, getTimeTableInfo, createBooking } from "../queries/roomQuery";

const roomRouter = Router();

// get all the resources object from database
roomRouter.get("/", getTimeTableInfo);
roomRouter.post("/roombooking", createBooking)
roomRouter.get("/:id", getRoomById);

export default roomRouter;
