import { Router } from "express";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";
import { BookingController } from "./booking.controller";

const router = Router();

router.post(
  "/",
  authGuard(USER_ROLE_ENUM.USER),
  BookingController.createBooking,
);

router.get(
  "/my",
  authGuard(USER_ROLE_ENUM.USER),
  BookingController.getMyBookings,
);

router.patch(
  "/:id/cancel",
  authGuard(USER_ROLE_ENUM.USER),
  BookingController.cancelBooking,
);

export const BookingRoute = router;
