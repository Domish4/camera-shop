import { createSlice } from '@reduxjs/toolkit';
import { getPromoAction } from '../api-actions';
import { PromoProduct } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type PromoSlice = {
  promo: PromoProduct[];
  status: Status;
};

export const initialState: PromoSlice = {
  promo: [],
  status: Status.Idle
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPromoAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.status = Status.Success;
      })
      .addCase(getPromoAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
