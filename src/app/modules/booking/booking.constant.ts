export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELED: "canceled",
} as const;

export const BOOKING_STATUS_ARRAY = Object.values(BOOKING_STATUS);

export const BOOKING_FILTER_FIELDS = [
  "bookingStatus",
  "serviceId",
  "preferredDate",
];
export const BOOKING_SEARCH_FIELDS = [
  "service",
  "address.city",
  "address.postcode",
];

export const MY_BOOKING_LIST_FILTER_FIELDS = [
  "bookingStatus",
  "serviceId",
  "preferredDate",
];
export const MY_BOOKING_LIST_SEARCH_FIELDS = [
  "service",
  "address.city",
  "address.postcode",
];

export type IBookingFilters = {
  searchTerm?: string;
};
