import { BookingModel } from "./booking.model";
import { BookingInterface } from "./booking.validation";

const createBooking = async (bookingData: BookingInterface) => {
  const {
    service,
    serviceId,
    productOption,
    durationHours,
    addOns,
    extraHours,
    address,
    preferredDate,
    preferredTimeSlots,
  } = bookingData;

  const booking = await BookingModel.create({
    service,
    serviceId,
    productOption,
    durationHours,
    addOns,
    extraHours,
    address,
    preferredDate,
    preferredTimeSlots,
  });

  return booking;
};

export const BookingService = {
  createBooking,
};
