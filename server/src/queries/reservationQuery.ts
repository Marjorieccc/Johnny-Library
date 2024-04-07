import { Request } from "express";
import Reservation from "../models/reservationModel";
export async function reservationQuery(req: Request) {
  try {
    const ReservationByUserID = await Reservation.find({
      userID: req.params.id,
    });
    if (!ReservationByUserID) {
      throw new Error("Reservation not found");
    }
    return ReservationByUserID;
  } catch (error) {
    throw error;
  }
}
