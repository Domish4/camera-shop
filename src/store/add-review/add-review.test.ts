import { Status } from '../../utils/const';
import { makeFakeAddReview } from '../../utils/mocks';
import { postReviewAction } from '../api-actions';
import { addReviewSlice, initialState } from './add-review-slice';


describe('Reducer: addReviewSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(addReviewSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return promo object', () => {
    const addReview = makeFakeAddReview();
    expect(addReviewSlice.reducer(initialState, {
      type: postReviewAction.fulfilled.type,
      payload: addReview
    }))
      .toEqual({
        ...initialState,
        addReview,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(addReviewSlice.reducer(initialState, {
      type: postReviewAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(addReviewSlice.reducer(initialState, {
      type: postReviewAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
