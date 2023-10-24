import { Status } from '../../utils/const';
import { makeFakeReviews } from '../../utils/mocks';
import { getReviewsAction } from '../api-actions';
import { initialState, reviewSlice } from './review-slice';


describe('Reducer: reviewsSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return array of reviews objects', () => {
    const reviews = makeFakeReviews();
    expect(reviewSlice.reducer(initialState, {
      type: getReviewsAction.fulfilled.type,
      payload: reviews
    }))
      .toEqual({
        ...initialState,
        reviews,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(reviewSlice.reducer(initialState, {
      type: getReviewsAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(reviewSlice.reducer(initialState, {
      type: getReviewsAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
