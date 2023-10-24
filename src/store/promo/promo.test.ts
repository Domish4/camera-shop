import { Status } from '../../utils/const';
import { makeFakePromo } from '../../utils/mocks';
import { getPromoAction } from '../api-actions';
import { initialState, promoSlice } from './promo.slice';


describe('Reducer: promoSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(promoSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return promo object', () => {
    const promo = makeFakePromo();
    expect(promoSlice.reducer(initialState, {
      type: getPromoAction.fulfilled.type,
      payload: promo
    }))
      .toEqual({
        ...initialState,
        promo,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(promoSlice.reducer(initialState, {
      type: getPromoAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(promoSlice.reducer(initialState, {
      type: getPromoAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
