import * as Yup from 'yup';

const tooShort = 'Too Short';
const tooLong = 'Too Long';

export const UserSchema = Yup.object({
  firstName: Yup.string().required('FirstName is required'),
  lastName: Yup.string().required('LastName is required'),
  phone: Yup.string()
    .min(10, 'Must be 10 characters')
    .max(14, 'Must be 10 characters')
    .required('Phone number is required'),
  userName: Yup.string()
    .min(3, tooShort)
    .max(30, tooLong)
    .required('Username is required'),
  email: Yup.string()
    .email()
    .min(8, tooShort)
    .max(60, tooLong)
    .required('Email is required'),
  status: Yup.string().required('Status is required'),
  roleId: Yup.number().required('User role is required'),
});

export const FollowUpSchema = Yup.object({
  from: Yup.string().email().required(),
  subject: Yup.string().required(),
  content: Yup.string().required(),
});

export const LocationSchema = Yup.object().shape({
  status: Yup.string().required(),
  name: Yup.string().required(),
  address: Yup.object({
    address1: Yup.string().required(),
    address2: Yup.string(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zipcode: Yup.string().required(),
    country: Yup.string().required(),
  }).required(),
  type: Yup.string().required(),
  description: Yup.string(),
});
