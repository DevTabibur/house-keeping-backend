import { FilterQuery, SortOrder } from "mongoose";
import { IBooking } from "./booking.interface";
import paginationHelper from "../../helpers/paginationHelper";
import {
  IGenericDataWithMeta,
  IPaginationOption,
} from "../../../interfaces/sharedInterface";
import BookingModel from "./booking.model";

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
  return await BookingModel.findById(id).populate("serviceId");
};

const getAllBookings = async (
  filters: any,
  paginationOption: IPaginationOption,
): Promise<IGenericDataWithMeta<IBooking[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper(paginationOption);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: ["service", "address.city"].map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await BookingModel.find(
    whereCondition as FilterQuery<IBooking>,
  )
    .populate("serviceId")
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

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
  return await BookingModel.findByIdAndUpdate(id, payload, { new: true });
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
