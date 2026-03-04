export enum SERVICE_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const SERVICE_LIST = {
  GENERAL: "general_cleaning",
  DEEP: "deep_cleaning",
  TENACY: "end_of_tenancy",
  AIRBNB: "airbnb_cleaning",
};

export const SERVICE_LIST_ARRAY = Object.values(SERVICE_LIST);
export const SERVICE_STATUS_ARRAY: string[] = Object.values(SERVICE_STATUS);
