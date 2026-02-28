export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

export const BOOKING_STATUS_ARRAY = Object.values(BOOKING_STATUS);

export const BOOKING_SEARCH_FIELDS = [
  "service",
  "address.city",
  "address.postcode",
];
export const BOOKING_FILTER_FIELDS = ["status", "serviceId", "preferredDate"];
