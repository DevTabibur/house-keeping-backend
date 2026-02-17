import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { createBookingZodSchema } from "./booking.validation";
import { sendErrorResponse } from "../../../shared/sendError";

const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    // ✅ Validate data with Zod schema
    const result = createBookingZodSchema.safeParse(req.body);
    const userId = req.user?.userId;

    if (!userId) {
      return sendErrorResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized",
      });
    }

    if (!result.success) {
      return sendErrorResponse(res, result.error);
    }

    // ✅ Data is valid
    const booking = await BookingService.createBooking(result.data);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Booking created successfully",
      data: booking,
    });
  },
);

export const BookingController = { createBookingController };
