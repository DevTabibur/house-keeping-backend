import { z } from "zod";

export const createBookingZodSchema = z.object({
  service: z
    .string({
      required_error: "Service is required",
      invalid_type_error: "Service must be a string",
    })
    .min(1, "Service cannot be empty"),

  serviceId: z
    .string({
      required_error: "Service ID is required",
      invalid_type_error: "Service ID must be a string",
    })
    .min(1, "Service ID cannot be empty"),

  productOption: z
    .string({
      required_error: "Product option is required",
      invalid_type_error: "Product option must be a string",
    })
    .min(1, "Product option cannot be empty"),

  durationHours: z
    .number({
      required_error: "Duration hours is required",
      invalid_type_error: "Duration hours must be a number",
    })
    .min(1, "Duration must be at least 1 hour"),

  addOns: z.object({
    fridge: z.boolean({
      required_error: "Fridge add-on is required",
      invalid_type_error: "Fridge must be true or false",
    }),

    oven: z.boolean({
      required_error: "Oven add-on is required",
      invalid_type_error: "Oven must be true or false",
    }),

    windows: z.boolean({
      required_error: "Windows add-on is required",
      invalid_type_error: "Windows must be true or false",
    }),

    balcony: z.boolean({
      required_error: "Balcony add-on is required",
      invalid_type_error: "Balcony must be true or false",
    }),
  }),

  extraHours: z
    .number({
      required_error: "Extra hours is required",
      invalid_type_error: "Extra hours must be a number",
    })
    .min(0, "Extra hours cannot be negative"),

  address: z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(5, "Address must be at least 5 characters"),

  preferredDate: z.date({
    required_error: "Preferred date is required",
    invalid_type_error: "Preferred date must be a valid date",
  }),

  preferredTimeSlots: z
    .array(
      z.string({
        required_error: "Time slot is required",
        invalid_type_error: "Time slot must be a string",
      }),
    )
    .min(1, "At least one time slot is required"),
});

// ✅ Keep the type export for TypeScript typing
export type BookingInterface = z.infer<typeof createBookingZodSchema>;
