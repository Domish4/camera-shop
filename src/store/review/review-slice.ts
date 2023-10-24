import { createSlice } from '@reduxjs/toolkit';
import {getReviewsAction } from '../api-actions';
import { Review } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type ReviewSlice = {
  reviews: Review[];
  status: Status;
};

export const initialState: ReviewSlice = {
  reviews: [],
  status: Status.Idle
};

export const reviewSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getReviewsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      })
      .addCase(getReviewsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
