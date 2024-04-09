import { Request, Response } from "express";
import {
  RoomBookingRecordModel,
  RoomModel,
} from "../models/roomModel";
import Logging from "../logging/logging";
import { Types } from "mongoose";
import { SECTION_INTERVAL } from "./roomQuery";


export const createBooking = async function (req: Request, res: Response) {
    if (
      req.body.userId &&
      req.body.room &&
      req.body.timeSlot &&
      req.body.timeSlot.start &&
      req.body.timeSlot.end &&
      new Date(req.body.timeSlot.end).getTime() -
        new Date(req.body.timeSlot.start).getTime() ===
        SECTION_INTERVAL * 60 * 1000
    ) {
      try {
        const roomId = new Types.ObjectId(req.body.room as Types.ObjectId);
  
       
        const user = req.body.userId;
  
        const room = await RoomModel.exists({
          _id: roomId,
        }).exec();
  
        if (!room) {
          res.status(404).json({ error: "Room Id does not exist" });
        } else {
          const notAvailable = await RoomBookingRecordModel.exists({
            room: roomId,
            $and: [
              { "timeSlot.start": { $lt: new Date(req.body.timeSlot.end) } },
              { "timeSlot.end": { $gt: new Date(req.body.timeSlot.start) } },
            ],
          }).exec();
  
          if (notAvailable) {
            res.status(500).json({
              error: "The room is not available for the selected time slot",
            });
          } else {
            const newBooking = {
              room: roomId,
              user: user,
              timeSlot: {
                start: new Date(req.body.timeSlot.start),
                end: new Date(req.body.timeSlot.end),
              },
            };
            await RoomBookingRecordModel.create(newBooking);
  
            const bookingDetails = await RoomBookingRecordModel.findOne(
              newBooking,
              "_id room user timeSlot"
            );
            res.status(200).json(bookingDetails);
          }
        }
      } catch (error) {
        Logging.error(error);
        res.status(500).json({ error: "Failed to process booking" });
      }
    } else {
      Logging.error("Invalid Booking Request");
      res.status(400).json({ error: "Invalid booking info" });
    }
  };
  