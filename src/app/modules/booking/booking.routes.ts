import { Router } from "express";
import { BookingController } from "./booking.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Housekeeping booking management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         service:
 *           type: string
 *         serviceId:
 *           type: string
 *         productOption:
 *           type: string
 *         durationHours:
 *           type: number
 *         addOns:
 *           type: object
 *           properties:
 *             fridge: { type: boolean }
 *             oven: { type: boolean }
 *             windows: { type: boolean }
 *             balcony: { type: boolean }
 *         extraHours:
 *           type: number
 *         address:
 *           type: object
 *           properties:
 *             city: { type: string }
 *             line1: { type: string }
 *             line2: { type: string }
 *             postcode: { type: string }
 *         preferredDate:
 *           type: string
 *           format: date-time
 *         preferredTimeSlots:
 *           type: array
 *           items: { type: string }
 *         status:
 *           type: string
 *           enum: [pending, confirmed, completed, canceled]
 *
 *     CreateBookingInput:
 *       type: object
 *       required:
 *         - service
 *         - serviceId
 *         - productOption
 *         - durationHours
 *         - address
 *         - preferredDate
 *         - preferredTimeSlots
 *       properties:
 *         service: { type: string, example: "Regular Cleaning" }
 *         serviceId: { type: string, example: "60d0fe4f5311236168a109ca" }
 *         productOption: { type: string, example: "3 Bedroom" }
 *         durationHours: { type: number, example: 3 }
 *         addOns:
 *           type: object
 *           properties:
 *             fridge: { type: boolean, default: false }
 *             oven: { type: boolean, default: false }
 *             windows: { type: boolean, default: false }
 *             balcony: { type: boolean, default: false }
 *         extraHours: { type: number, default: 0 }
 *         address:
 *           type: object
 *           required: [city, line1, postcode]
 *           properties:
 *             city: { type: string, example: "London" }
 *             line1: { type: string, example: "123 Street Name" }
 *             line2: { type: string }
 *             postcode: { type: string, example: "SW1A 1AA" }
 *         preferredDate: { type: string, format: date, example: "2024-03-01" }
 *         preferredTimeSlots: { type: array, items: { type: string }, example: ["09:00 - 10:00"] }
 */

/**
 * @swagger
 * /booking/create:
 *   post:
 *     summary: Create a new booking
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingInput'
 *     responses:
 *       200:
 *         description: Booking created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/create",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.GUEST, USER_ROLE_ENUM.EDITOR),
  BookingController.createBookingController,
);

/**
 * @swagger
 * /booking:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, confirmed, completed, canceled] }
 *       - in: query
 *         name: page
 *         schema: { type: integer,   default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of all bookings
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authGuard(USER_ROLE_ENUM.ADMIN),
  BookingController.getAllBookings,
);

/**
 * @swagger
 * /booking/{id}:
 *   get:
 *     summary: Get single booking details
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Booking details retrieved
 *       404:
 *         description: Booking not found
 */
router.get(
  "/:id",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR, USER_ROLE_ENUM.GUEST),
  BookingController.getSingleBooking,
);

/**
 * @swagger
 * /booking/{id}:
 *   patch:
 *     summary: Update booking
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingInput'
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
router.patch(
  "/:id",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.EDITOR),
  BookingController.updateBooking,
);

/**
 * @swagger
 * /booking/{id}:
 *   delete:
 *     summary: Delete booking
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 */
router.delete(
  "/:id",
  authGuard(USER_ROLE_ENUM.ADMIN),
  BookingController.deleteBooking,
);

export const BookingRoute = router;
