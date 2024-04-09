import { Router } from "express";
import { verifyToken } from "../middleware/middleware";
import {
  getRoomById,
  getRoomByUserId,
  getTimeTableInfo,
} from "../queries/roomQuery";
import { createBooking } from "../queries/createRoomBooking";

const roomRouter = Router();

// get all the resources object from database
roomRouter.get("/", getTimeTableInfo);
roomRouter.post("/roombooking", verifyToken, createBooking);
roomRouter.get("/:id", getRoomById);
roomRouter.get("/user/:id", getRoomByUserId);

export default roomRouter;
