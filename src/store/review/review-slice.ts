import { createSlice } from '@reduxjs/toolkit';
import {getReviewsAction, postReviewAction } from '../api-actions';
import { Review } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type ReviewSlice = {
  reviews: Review[];
  status: Status;
  addReview: Review | null;
  postStatus: Status;
};

export const initialState: ReviewSlice = {
  reviews: [],
  status: Status.Idle,
  addReview: null,
  postStatus: Status.Idle
};

export const reviewSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: { changePostStatus: (state) => {
    state.postStatus = Status.Idle;
  }},
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
      })
      .addCase(postReviewAction.pending, (state) => {
        state.postStatus = Status.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.postStatus = Status.Success;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.postStatus = Status.Error;
      });
  }
});

export const { changePostStatus } = reviewSlice.actions;

