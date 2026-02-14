import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { Services } from "./service.services";
import httpStatus from "http-status";
import { sendErrorResponse } from "../../../shared/sendError";
import { createServiceZodSchema } from "./service.validation";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";

const createServiceController = catchAsync(
  async (req: Request, res: Response) => {
    // parse the request body
    const result = createServiceZodSchema.safeParse(req.body);
    const userId = req.user?.userId;

    if (!userId) {
      return sendErrorResponse(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Unauthorized user",
      });
    }

    if (!result.success) {
      return sendErrorResponse(res, result.error);
    }

    const service = await Services.createService(result.data, userId);

    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Service created successfully",
      data: service,
    });
  },
);

export const ServiceController = { createServiceController };
