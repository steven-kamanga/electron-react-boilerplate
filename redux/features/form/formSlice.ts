import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';
import { UserRegisterSchema } from '../../../schema/auth/UserRegisterSchema';

// Define the form data type based on the schema
export type UserRegisterFormData = Partial<z.infer<typeof UserRegisterSchema>>;

interface FormState {
  userRegistration: UserRegisterFormData;
}

const initialState: FormState = {
  userRegistration: {
    firstName: '',
    lastName: '',
    email: '',
    countryOfResidence: '',
    phoneNumber: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  },
};

const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState,
  reducers: {
    updateUserRegistrationForm: (
      state,
      action: PayloadAction<Partial<UserRegisterFormData>>,
    ) => {
      state.userRegistration = {
        ...state.userRegistration,
        ...action.payload,
      };
    },
    clearUserRegistrationForm: (state) => {
      state.userRegistration = initialState.userRegistration;
    },
    resetFormField: (
      state,
      action: PayloadAction<keyof UserRegisterFormData>,
    ) => {
      const field = action.payload;
      if (state.userRegistration[field] !== undefined) {
        state.userRegistration[field] = '';
      }
    },
  },
});

export const {
  updateUserRegistrationForm,
  clearUserRegistrationForm,
  resetFormField,
} = userRegistrationSlice.actions;

export const selectUserRegistrationForm = (state: {
  userRegistration: FormState;
}) => state.userRegistration.userRegistration;

export default userRegistrationSlice.reducer;
