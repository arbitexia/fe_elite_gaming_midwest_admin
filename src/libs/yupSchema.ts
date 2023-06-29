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
  status: Yup.string(),
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

export const TabletCreateSchema = Yup.object({
  name: Yup.string().required(),
  locationId: Yup.number().required(),
  status: Yup.string().required(),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const TabletEditSchema = Yup.object({
  name: Yup.string().required(),
  locationId: Yup.number().required(),
  status: Yup.string().required(),
});

export const TabletChangePwdSchema = Yup.object({
  oldPassword: Yup.string().required(),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const ProfileSchema = Yup.object({
  firstName: Yup.string().required('FirstName is required'),
  lastName: Yup.string().required('LastName is required'),
  phone: Yup.string().min(10).max(10).required('Phone number is required'),
  userName: Yup.string()
    .min(3, tooShort)
    .max(30, tooLong)
    .required('Username is required'),
  email: Yup.string()
    .email()
    .min(8, tooShort)
    .max(60, tooLong)
    .required('Email is required'),
});

export const ProfileChangePwdSchema = Yup.object({
  oldPassword: Yup.string().required(),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const ProductSchema = Yup.object().shape({
  name: Yup.string().required(),
  amount: Yup.number().min(1).required(),
  short: Yup.string().required(),
  description: Yup.string(),
});

export const ForgotPasswordSchema = Yup.object({
  identifier: Yup.string().email().required('Email is required'),
});

export const ResetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const RewardSchema = Yup.object({
  point: Yup.number().positive().required(),
  pointThreshold: Yup.number().max(Yup.ref('point')),
  coupon: Yup.number().positive().required(),
  couponThreshold: Yup.number().max(Yup.ref('coupon')),
});

export const CampaignSchema = Yup.object({
  name: Yup.string().required(),
  model: Yup.string().required(),
  type: Yup.string().required(),
  offer: Yup.number().positive().required('Invalid offer'),
  offerType: Yup.string().required(),
  startDate: Yup.string().required(),
  endDate: Yup.string().when('startDate', (startDate, schema) =>
    schema
      .required()
      .test(
        'is-greater',
        'End date must be greater than start date',
        function (endDate) {
          return new Date(endDate) > new Date(startDate.toString());
        }
      )
  ),
  channels: Yup.number().positive().required('Select channels'),
  status: Yup.number().positive().required(),
});
