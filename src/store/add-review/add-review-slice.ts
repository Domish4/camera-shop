import { createSlice } from '@reduxjs/toolkit';
import {postReviewAction } from '../api-actions';
import { Review } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type AddReviewSlice = {
  addReview: Review | null;
  status: Status;
};

export const initialState: AddReviewSlice = {
  addReview: null,
  status: Status.Idle
};

export const addReviewSlice = createSlice({
  name: NameSpace.AddReview,
  initialState,
  reducers: { changePostStatus: (state) => {
    state.status = Status.Idle;
  }},
  extraReducers(builder) {
    builder
      .addCase(postReviewAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.addReview = action.payload;
        state.status = Status.Success;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});

export const { changePostStatus } = addReviewSlice.actions;
