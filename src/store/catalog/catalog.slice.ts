import { createSlice } from '@reduxjs/toolkit';
import { getCatalogAction } from '../api-actions';
import { Product } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type CatalogSlice = {
  catalog: Product[];
  status: Status;
};

const initialState: CatalogSlice = {
  catalog: [],
  status: Status.Idle
};

export const catalogSlice = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCatalogAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getCatalogAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.status = Status.Success;
      })
      .addCase(getCatalogAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
