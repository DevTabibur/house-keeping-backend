import { Request, Response } from "express";
import httpStatus from "http-status";
import { ServiceService } from "./service.service";
import catchAsync from "../../../shared/catchAsync";
import { sendSuccessResponse } from "../../../shared/sendSuccessResponse";

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.createService(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
    message: "Service created successfully",
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.getAllServices();

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.updateService(req.params.id, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Service updated",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceService.deleteService(req.params.id);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Service disabled",
    data: result,
  });
});

export const ServiceController = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
