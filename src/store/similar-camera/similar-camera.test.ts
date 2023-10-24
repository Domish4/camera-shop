import { Status } from '../../utils/const';
import { makeFakeCameras } from '../../utils/mocks';
import { getSimilarProductsAction } from '../api-actions';
import { SimilarProductSlice, initialState } from './similar-camera-slice';


describe('Reducer: promoSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(SimilarProductSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return similar array object', () => {
    const similarProduct = makeFakeCameras();
    expect(SimilarProductSlice.reducer(initialState, {
      type: getSimilarProductsAction.fulfilled.type,
      payload: similarProduct
    }))
      .toEqual({
        ...initialState,
        similarProduct,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(SimilarProductSlice.reducer(initialState, {
      type: getSimilarProductsAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(SimilarProductSlice.reducer(initialState, {
      type: getSimilarProductsAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
