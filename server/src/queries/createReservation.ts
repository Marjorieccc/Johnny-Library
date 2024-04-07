import { Request, Response, NextFunction } from "express";
import Reservation from "../models/reservationModel";

export async function createReservation(req: Request, res: Response) {
  try {
    const { userID, resourceID, resourceTitle, mediumID, format } = req.body;

    console.log(`Making reservation:  ${userID}`);
    const revTime = new Date();
    const reservation = new Reservation({
      userID,
      resourceID,
      resourceTitle,
      mediumID,
      format,
      time: revTime,
    });

    await reservation.save();
    return ({ success: true });
  } catch (err) {
    console.log(err);
    throw new Error ("Reservation Failed");
  }
}
