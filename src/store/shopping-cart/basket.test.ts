import {shoppingCartSlice } from './shopping-cart-slice';

describe('Busket reducers', () => {
  const initialState = shoppingCartSlice.getInitialState();
  const emptyAction = { type: '' };

  it('should return initial state', () => {
    const result = shoppingCartSlice.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return initial state with empty action and undefined state', () => {
    const result = shoppingCartSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });
});
