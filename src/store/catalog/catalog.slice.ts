import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCatalogAction } from '../api-actions';
import { Product } from '../../types/product-camera-type';
import { NameSpace, Status } from '../../utils/const';


export type CatalogSlice = {
  catalog: Product[];
  status: Status;
  currentPage: number | null;
};

export const initialState: CatalogSlice = {
  catalog: [],
  status: Status.Idle,
  currentPage: null
};

export const catalogSlice = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
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
