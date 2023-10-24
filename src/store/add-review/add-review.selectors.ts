import { createSelector } from '@reduxjs/toolkit';
import { Review } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';


export const getAddReviews = (state: State): Review | null => state[NameSpace.AddReview].addReview;
export const getAddReviewStatus = (state: State): Status => state[NameSpace.AddReview].status;

export const getSendReviewStatus = createSelector([getAddReviewStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

