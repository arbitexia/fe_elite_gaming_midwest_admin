export type ConfigType = {
  id: number;
  daily: number;
  weekly: number;
  monthly: number;
  checkinThreshold: number;
  coupon: number;
  requestCoupon: number;
  initialCoupon: number;
};

export type ConfigInputType = {
  input: ConfigType;
};

export type GetConfigParam = {
  locationId: number;
};
