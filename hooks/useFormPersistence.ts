import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  updateUserRegistrationForm,
  selectUserRegistrationForm,
  clearUserRegistrationForm,
  UserRegisterFormData,
} from '../redux/features/form/formSlice';
import type { RootState } from '../redux/store';

/**
 * Custom hook to persist form data in Redux
 * @param form - React Hook Form instance
 * @returns Object with form utilities
 */
export const useFormPersistence = <T extends Record<string, any>>(
  form: UseFormReturn<T>,
) => {
  const dispatch = useDispatch();
  const persistedData = useSelector((state: RootState) =>
    selectUserRegistrationForm(state),
  );
  const isInitialized = useRef(false);

  // Update Redux store whenever form values change
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Only update Redux if the component is initialized to prevent loops
      if (isInitialized.current) {
        dispatch(updateUserRegistrationForm(value as UserRegisterFormData));
      }
    });
    return () => subscription.unsubscribe();
  }, [form, dispatch]);

  // Reset form with persisted data when component mounts (only once)
  useEffect(() => {
    if (persistedData && !isInitialized.current) {
      form.reset(persistedData as T);
      isInitialized.current = true;
    }
  }, [persistedData, form]);

  const clearForm = useCallback(() => {
    dispatch(clearUserRegistrationForm());
    form.reset({} as T);
    isInitialized.current = false;
  }, [dispatch, form]);

  return {
    persistedData,
    clearForm,
  };
};
