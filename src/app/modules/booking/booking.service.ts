import { BookingModel } from "./booking.model";
import { IBooking } from "./booking.interface";

const createBooking = async (payload: IBooking) => {
  return await BookingModel.create(payload);
};

const getMyBookings = async (userId: string) => {
  return await BookingModel.find({ user: userId }).sort({ date: -1 });
};

const cancelBooking = async (bookingId: string) => {
  return await BookingModel.findByIdAndUpdate(
    bookingId,
    { status: "canceled" },
    { new: true },
  );
};

export const BookingService = {
  createBooking,
  getMyBookings,
  cancelBooking,
};
