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

export type BackOfficeType = {
  id: number;
  coupon: number;
  type: 'FREE' | 'MATCH';
  checkinThreshold: number;
  days: number;
  status: number;
  createdAt?: number;
};
