export type ConfigType = {
  id: number;
  daily: number;
  weekly: number;
  monthly: number;
  checkinThreshold: number;
  coupon: number;
};

export type ConfigInputType = {
  input: ConfigType;
};

export type GetConfigParam = {
  locationId: number;
};
