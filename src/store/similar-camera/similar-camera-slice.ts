import { createSlice } from '@reduxjs/toolkit';
import { getSimilarProductsAction } from '../api-actions';
import { Product } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type SimilarProduct = {
  similarProduct: Product[];
  status: Status;
};

export const initialState: SimilarProduct = {
  similarProduct: [],
  status: Status.Idle
};

export const SimilarProductSlice = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSimilarProductsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProduct = action.payload;
        state.status = Status.Success;
      })
      .addCase(getSimilarProductsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
