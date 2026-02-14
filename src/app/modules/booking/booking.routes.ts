import { Router } from "express";
import { BookingController } from "./booking.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

router.post(
  "/create",
  //   authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.GUEST, USER_ROLE_ENUM.EDITOR),
  BookingController.createBookingController,
);

export const BookingRoute = router;
