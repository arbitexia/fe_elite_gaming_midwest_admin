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
