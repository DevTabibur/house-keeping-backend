import { BillingController } from "./billing.controller";
import { Router } from "express";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

router.get(
  "/my",
  authGuard(USER_ROLE_ENUM.USER),
  BillingController.getMyBillings,
);

export const BillingRoute = router;
