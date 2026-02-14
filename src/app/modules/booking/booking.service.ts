import { BookingModel } from "./booking.model";
import { BookingInterface } from "./booking.validation";

const createBooking = async (bookingData: BookingInterface, userId: string) => {
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
  console.log("users ", userId);

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
    userId,
  });

  return booking;
};

export const BookingService = {
  createBooking,
};
