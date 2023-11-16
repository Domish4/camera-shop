import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCatalogAction } from '../api-actions';
import { Product } from '../../types/product-camera-type';
import { CategoryProduct, LevelProduct, NameSpace, ProductType, SortOrder, SortType, Status } from '../../utils/const';


export type CatalogSlice = {
  catalog: Product[];
  status: Status;
  currentPage: number | null;
  sortType: SortType | null;
  sortOrder: SortOrder | null;
  category: CategoryProduct | null;
  types: ProductType[];
  levels: LevelProduct[];
  minPrice: number;
  maxPrice: number;
};

export const initialState: CatalogSlice = {
  catalog: [],
  status: Status.Idle,
  currentPage: null,
  sortType: null,
  sortOrder: null,
  category: null,
  types: [],
  levels: [],
  minPrice: 0,
  maxPrice: 0,
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
    changeCategory: (state, action: {payload: CategoryProduct | null}) => {
      state.category = action.payload;
    },
    changeType: (state, action: {payload: ProductType}) => {
      if (state.types.includes(action.payload)) {
        state.types = state.types.filter((type) => type !== action.payload);

        return;
      }

      state.types.push(action.payload);
    },
    changeLevel: (state, action: {payload: LevelProduct}) => {
      if (state.levels.includes(action.payload)) {
        state.levels = state.levels.filter((level) => level !== action.payload);

        return;
      }

      state.levels.push(action.payload);
    },
    setMinPrice: (state, action: {payload: number}) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: {payload: number}) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.category = null;
      state.types = [];
      state.levels = [];
      state.minPrice = 0;
      state.maxPrice = 0;
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

export const {setCurrentPage, selectSortOrder, selectSortType, resetFilters, setMaxPrice, setMinPrice, changeCategory, changeLevel, changeType} = catalogSlice.actions;
