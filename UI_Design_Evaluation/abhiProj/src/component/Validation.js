import * as yup from 'yup'

export const Validation = yup.object().shape({
    phoneNumber: yup
      .string()
      .matches(/(91)(\d){10}\b/, 'Enter a valid Indian phone number')
      .required('Mobile number is required'),
   
    password: yup
      .string()
      .matches(/\d{4}/, "Password must be a number")
      .max(4, ({ max }) => `Password cannot be more then ${max} characters`)
      .required('MPin is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),
  })