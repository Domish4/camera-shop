import { createSelector } from '@reduxjs/toolkit';
import { Review } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';
import { getSortedReviews } from '../../utils/reviews-utils';


export const getReviews = (state: State): Review[] => state[NameSpace.Reviews].reviews;
export const getStatus = (state: State): Status => state[NameSpace.Reviews].status;

export const getAddReviewStatus = (state: State): Status => state[NameSpace.Reviews].postStatus;

export const getSendReviewStatus = createSelector([getAddReviewStatus], (status) => ({
  isLoading: [Status.Idle, Status.Loading].includes(status),
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));


export const getRenderedReviews = createSelector([getReviews], (reviews) => getSortedReviews(reviews));
