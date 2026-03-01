import { FilterQuery, SortOrder, Types } from "mongoose";
import { IBooking } from "./booking.interface";
import paginationHelper from "../../helpers/paginationHelper";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import BookingModel from "./booking.model";
import { BOOKING_SEARCH_FIELDS, IBookingFilters } from "./booking.constant";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createBooking = async (payload: IBooking) => {
  return await BookingModel.create(payload);
};

const getMyBookings = async (userId: string) => {
  return await BookingModel.find({ user: userId }).sort({ createdAt: -1 });
};

const cancelBooking = async (bookingId: string) => {
  return await BookingModel.findByIdAndUpdate(
    bookingId,
    { status: "canceled" },
    { new: true },
  );
};

const getSingleBooking = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "ID is not valid");
  }

  const result = await BookingModel.findById(id);

  if (!result) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Booking not found. Please try another!",
    );
  }

  return result;
};

const getAllBookings = async (
  filters: IBookingFilters,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IBooking[]>> => {
  const { searchTerm, ...filtersFields } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BOOKING_SEARCH_FIELDS.map((field) => ({
        [field]: new RegExp(searchTerm, "i"),
      })),
    });
  }

  if (Object.keys(filtersFields).length) {
    const fieldConditions = Object.entries(filtersFields).map(
      ([key, value]) => ({
        [key]: value,
      }),
    );
    andConditions.push({ $and: fieldConditions });
  }

  const whereCondition = andConditions.length ? { $and: andConditions } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await BookingModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit as number);

  const total = await BookingModel.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "ID is not valid");
  }

  const updateBooking = await BookingModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true, // Return updated document
      runValidators: true, // Apply schema validation
    },
  );

  if (!updateBooking) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Booking not found or update failed!",
    );
  }

  return updateBooking as IBooking;
};

const deleteBooking = async (id: string) => {
  return await BookingModel.findByIdAndDelete(id);
};

export const BookingService = {
  createBooking,
  getMyBookings,
  cancelBooking,
  getSingleBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
