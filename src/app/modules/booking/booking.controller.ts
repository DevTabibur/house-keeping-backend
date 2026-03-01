import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { BookingService } from "./booking.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import { sendErrorResponse } from "../../../shared/sendError";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/shared.constant";
import { BOOKING_FILTER_FIELDS } from "./booking.constant";
import { createBookingZodSchema } from "./booking.validation";
import { IPaginationOption } from "../../../interfaces/sharedInterface";

const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    // console.log("create data", req.body);
    const booking = req.body;
    const result = await BookingService.createBooking(booking);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Booking created successfully",
      data: result,
    });
  },
);

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...BOOKING_FILTER_FIELDS]);
  const paginationOption: IPaginationOption = pick(req.query, paginationFields);

  const result = await BookingService.getAllBookings(filters, paginationOption);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking list fetched successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("id", id);
  const result = await BookingService.getSingleBooking(id);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking details fetched successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateInfo = req.body;
  console.log("id", id);

  const result = await BookingService.updateBooking(id, updateInfo);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await BookingService.deleteBooking(id);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking deleted successfully",
    data: null,
  });
});

export const BookingController = {
  createBookingController,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
