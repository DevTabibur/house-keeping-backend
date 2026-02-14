import { Router } from "express";
import { BookingController } from "./booking.controller";

const router = Router();

router.get("/booking", BookingController.createBookingController);

export const BookingRoute = router;
