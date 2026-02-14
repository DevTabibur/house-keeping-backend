import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { BookingService } from "./booking.service";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";
import httpStatus from "http-status";
import { createBookingZodSchema } from "./booking.validation";

const createBookingController = catchAsync(
  async (req: Request, res: Response) => {
    // ✅ Validate data with Zod schema
    const result = createBookingZodSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Validation Error",
        errors: result.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // ✅ Data is valid
    const booking = await BookingService.createBooking(result.data);
    console.log("books", booking);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Booking created successfully",
      data: booking,
    });
  },
);

export const BookingController = { createBookingController };
