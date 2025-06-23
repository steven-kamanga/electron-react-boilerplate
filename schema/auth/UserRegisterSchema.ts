import * as z from 'zod';

export const UserRegisterSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  username: z.string().min(1, { message: 'User name is required' }),
  dateOfBirth: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    },
    { message: 'Invalid date format' },
  ),
  countryOfResidence: z.string().min(1, { message: 'Country is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  nationalId: z.string().min(1, { message: 'National ID is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});
