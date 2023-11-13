import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCatalogAction } from '../api-actions';
import { Product } from '../../types/product-camera-type';
import { NameSpace, SortOrder, SortType, Status } from '../../utils/const';


export type CatalogSlice = {
  catalog: Product[];
  status: Status;
  currentPage: number | null;
  sortType: SortType | null;
  sortOrder: SortOrder | null;
};

export const initialState: CatalogSlice = {
  catalog: [],
  status: Status.Idle,
  currentPage: null,
  sortType: null,
  sortOrder: null,
};

export const catalogSlice = createSlice({
  name: NameSpace.Catalog,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    selectSortType: (state, action: PayloadAction<SortType | null>) => {
      state.sortType = action.payload;
    },
    selectSortOrder: (state, action: PayloadAction<SortOrder | null>) => {
      state.sortOrder = action.payload;
    },
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

export const {setCurrentPage, selectSortOrder, selectSortType} = catalogSlice.actions;
