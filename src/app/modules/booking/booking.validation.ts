// import { z } from "zod";
// import mongoose from "mongoose";

// export const createBookingZodSchema = z.object({
//   service: z
//     .string({
//       required_error: "Service is required",
//       invalid_type_error: "Service must be a string",
//     })
//     .min(1, "Service cannot be empty"),

//   serviceId: z
//     .string({
//       required_error: "Service ID is required",
//       invalid_type_error: "Service ID must be a string",
//     })
//     .refine((val) => mongoose.Types.ObjectId.isValid(val), {
//       message: "Invalid Service ID",
//     })
//     .transform((val) => new mongoose.Types.ObjectId(val)),

//   productOption: z
//     .string({
//       required_error: "Product option is required",
//       invalid_type_error: "Product option must be a string",
//     })
//     .min(1, "Product option cannot be empty"),

//   durationHours: z
//     .number({
//       required_error: "Duration hours is required",
//       invalid_type_error: "Duration hours must be a number",
//     })
//     .min(1, "Duration must be at least 1 hour"),

//   addOns: z.object({
//     fridge: z
//       .boolean({
//         invalid_type_error: "Fridge must be true or false",
//       })
//       .default(false), // ✅ default false

//     oven: z
//       .boolean({
//         invalid_type_error: "Oven must be true or false",
//       })
//       .default(false),

//     windows: z
//       .boolean({
//         invalid_type_error: "Windows must be true or false",
//       })
//       .default(false),

//     balcony: z
//       .boolean({
//         invalid_type_error: "Balcony must be true or false",
//       })
//       .default(false),
//   }),

//   extraHours: z
//     .number({
//       required_error: "Extra hours is required",
//       invalid_type_error: "Extra hours must be a number",
//     })
//     .min(0, "Extra hours cannot be negative"),

//   address: z.object({
//     city: z
//       .string({ required_error: "City is required" })
//       .min(1, "City cannot be empty"),
//     line1: z
//       .string({ required_error: "Address line1 is required" })
//       .min(1, "Address line1 cannot be empty"),
//     line2: z.string().optional(),
//     postcode: z
//       .string({ required_error: "Postcode is required" })
//       .min(1, "Postcode cannot be empty"),
//   }),

//   preferredDate: z.preprocess(
//     (arg) =>
//       typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
//     z.date({
//       required_error: "Preferred date is required",
//       invalid_type_error: "Preferred date must be a valid date",
//     }),
//   ),

//   preferredTimeSlots: z
//     .array(
//       z.string({
//         required_error: "Time slot is required",
//         invalid_type_error: "Time slot must be a string",
//       }),
//     )
//     .min(1, "At least one time slot is required"),
// });

import { z } from "zod";
import mongoose from "mongoose";
import { BOOKING_STATUS_ARRAY } from "./booking.constant";

/**
 * Helper: ObjectId validator
 */
const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const createBookingZodSchema = z.object({
  body: z.object({
    userId: objectIdSchema.transform((val) => new mongoose.Types.ObjectId(val)),

    bookingStatus: z
      .enum(BOOKING_STATUS_ARRAY as [string, ...string[]])
      .optional(),

    address: z
      .object({
        address1: z.string().min(1).optional(),
        address2: z.string().optional(),
        city: z.string().min(1).optional(),
        postcode: z.string().min(1).optional(),
      })
      .optional(),

    service: z.object({
      serviceId: objectIdSchema,
      serviceName: z
        .string({
          required_error: "Service name is required",
        })
        .min(1),
    }),

    productOption: z
      .object({
        addOns: z.array(z.string()).optional(),
        duration: z
          .number({
            invalid_type_error: "Duration must be a number",
          })
          .min(1)
          .optional(),
        totalPrice: z.number().min(0).optional(),
        extraHours: z.number().min(0).optional(),
      })
      .optional(),

    // timeSlots: z.object({
    //   selectedDate: z.preprocess(
    //     (arg) =>
    //       typeof arg === "string" || arg instanceof Date ? new Date(arg) : arg,
    //     z.date({
    //       required_error: "Selected date is required",
    //     }),
    //   ),
    //   selectedSlots: z
    //     .number({
    //       required_error: "Selected slot is required",
    //     })
    //     .min(1),
    // }),
    timeSlots: z
      .object({
        selectedDate: z.preprocess(
          (arg) =>
            typeof arg === "string" || arg instanceof Date
              ? new Date(arg)
              : arg,
          z.date({
            required_error: "Selected date is required",
          }),
        ),
        selectedSlots: z
          .number({
            required_error: "Selected slot is required",
          })
          .min(1),
      })
      .optional(),
  }),
});
