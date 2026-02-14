import { z } from "zod";

export const createServiceZodSchema = z.object({
  title: z
    .string({
      required_error: "Service title is required",
      invalid_type_error: "Service title must be a string",
    })
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters"),

  image: z
    .string({
      required_error: "Image URL is required",
    })
    .url("Invalid image URL"),

  description: z
    .string({
      required_error: "Description is required",
    })
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description too long"),

  checklist: z
    .array(z.string().trim().min(1, "Checklist item cannot be empty"))
    .min(1, "At least one checklist item is required"),
});

export type ServiceInterface = z.infer<typeof createServiceZodSchema>;
