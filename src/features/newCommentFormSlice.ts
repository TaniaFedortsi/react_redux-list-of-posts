/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NewCommentFormState {
  submitting: boolean;
  errors: {
    name: boolean;
    email: boolean;
    body: boolean;
  };
  values: {
    name: string;
    email: string;
    body: string;
  };
}

export const initialState: NewCommentFormState = {
  submitting: false,
  errors: {
    name: false,
    email: false,
    body: false,
  },
  values: {
    name: '',
    email: '',
    body: '',
  },
};

export const newCommentFormSlice = createSlice({
  name: 'newCommentForm',
  initialState,
  reducers: {
    setFieldValue: (
      state,
      action: PayloadAction<{
        field: keyof NewCommentFormState['values'];
        value: string;
      }>,
    ) => {
      const { field, value } = action.payload;

      state.values[field] = value;
      state.errors[field] = false;
    },
    setFieldError: (
      state,
      action: PayloadAction<keyof NewCommentFormState['errors']>,
    ) => {
      const field = action.payload;

      state.errors[field] = true;
    },
    clearForm: state => {
      state.values = { ...initialState.values };
      state.errors = { ...initialState.errors };
      state.submitting = false;
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload;
    },
  },
});

export const { setFieldValue, setFieldError, clearForm, setSubmitting } =
  newCommentFormSlice.actions;

export default newCommentFormSlice.reducer;
