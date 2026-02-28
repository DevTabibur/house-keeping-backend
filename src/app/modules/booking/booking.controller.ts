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

const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    console.log("create data", req.body);

    //   const booking = await BookingService.createBooking({
    //     ...result.data,
    //     user: userId,
    //   } as any);

    //   sendSuccessResponse(res, {
    //     statusCode: httpStatus.OK,
    //     message: "Booking created successfully",
    //     data: booking,
    //   });
  },
);

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["searchTerm", ...BOOKING_FILTER_FIELDS]);
  const paginationOption = pick(req.query, paginationFields);

  const result = await BookingService.getAllBookings(filters, paginationOption);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Bookings fetched successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingService.getSingleBooking(id);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Booking fetched successfully",
    data: result,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const validationResult = updateBookingZodSchema.safeParse(req.body);

  if (!validationResult.success) {
    return sendErrorResponse(res, validationResult.error);
  }

  const result = await BookingService.updateBooking(id, validationResult.data);

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
