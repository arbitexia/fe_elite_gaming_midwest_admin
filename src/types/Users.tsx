export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  asset: string;
  location: AddressType;
  phonenumber: string;
  birthday: string;
  role: number;
  status: number;
  createdAt: string;
};

export type AddressType = {
  address1: string;
  address2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
};
