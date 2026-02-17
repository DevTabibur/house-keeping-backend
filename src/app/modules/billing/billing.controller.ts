import { Request, Response } from "express";
import httpStatus from "http-status";
import { BillingService } from "./billing.service";

const getMyBillings = async (req: Request, res: Response) => {
  const result = await BillingService.getMyBillings(req.user.id);

  res.status(httpStatus.OK).json({
    success: true,
    data: result,
  });
};

export const BillingController = {
  getMyBillings,
};
