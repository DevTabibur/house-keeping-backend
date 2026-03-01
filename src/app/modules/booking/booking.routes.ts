import { Router } from "express";
import { BookingController } from "./booking.controller";
import authGuard from "../../middlewares/authGuard";
import { USER_ROLE_ENUM } from "../user/user.constant";
import zodValidateRequest from "../../middlewares/zodValidateRequest";
import { createBookingZodSchema } from "./booking.validation";

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
 *     userId:
 *       type: string
 *
 *     Address:
 *       type: object
 *       properties:
 *         address1:
 *           type: string
 *           example: "221B Baker Street"
 *         address2:
 *           type: string
 *           example: "Apt 4B"
 *         city:
 *           type: string
 *           example: "London"
 *         postcode:
 *           type: string
 *           example: "NW1 6XE"
 *
 *     Service:
 *       type: object
 *       required:
 *         - serviceId
 *         - serviceName
 *       properties:
 *         serviceId:
 *           type: string
 *           example: "65f1c2a3e4b5c6d7e8f90123"
 *         serviceName:
 *           type: string
 *           example: "Regular Cleaning"
 *
 *     ProductOption:
 *       type: object
 *       properties:
 *         addOns:
 *           type: string
 *           example: "fridge, oven"
 *         duration:
 *           type: number
 *           example: 3
 *         totalPrice:
 *           type: number
 *           example: 120
 *         extraHours:
 *           type: number
 *           example: 1
 *
 *     TimeSlots:
 *       type: object
 *       required:
 *         - selectedDate
 *         - selectedSlots
 *       properties:
 *         selectedDate:
 *           type: string
 *           format: date-time
 *           example: "2024-03-01T09:00:00.000Z"
 *         selectedSlots:
 *           type: number
 *           example: 2
 *
 *     CreateBookingInput:
 *       type: object
 *       required:
 *         - service
 *         - timeSlots
 *       properties:
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         service:
 *           $ref: '#/components/schemas/Service'
 *         productOption:
 *           $ref: '#/components/schemas/ProductOption'
 *         timeSlots:
 *           $ref: '#/components/schemas/TimeSlots'
 *
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "665fa1234bcdef567890abcd"
 *         userId:
 *           type: string
 *           example: "665fa1234bcdef567890aaaa"
 *         bookingStatus:
 *           type: string
 *           enum: [pending, confirmed, completed, canceled]
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         service:
 *           $ref: '#/components/schemas/Service'
 *         productOption:
 *           $ref: '#/components/schemas/ProductOption'
 *         timeSlots:
 *           $ref: '#/components/schemas/TimeSlots'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /booking/create:
 *   post:
 *     summary: Create a new booking
 *     description: Creates a new housekeeping booking. Booking status defaults to "pending".
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/create",
  authGuard(USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.GUEST, USER_ROLE_ENUM.EDITOR),
  zodValidateRequest(createBookingZodSchema),
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
