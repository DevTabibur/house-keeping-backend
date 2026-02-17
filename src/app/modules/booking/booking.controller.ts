import { Request, Response } from "express";
import httpStatus from "http-status";
import { BookingService } from "./booking.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";

const createBooking = async (req: Request, res: Response) => {
  const result = await BookingService.createBooking(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Booking created successfully",
  });
};

const getMyBookings = async (req: Request, res: Response) => {
  const result = await BookingService.getMyBookings(req.user.id);

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
  });
};

const cancelBooking = async (req: Request, res: Response) => {
  const result = await BookingService.cancelBooking(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Booking canceled",
    data: result,
  });
};

export const BookingController = {
  createBooking,
  getMyBookings,
  cancelBooking,
};
