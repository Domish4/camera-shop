import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { CategoryProduct, LevelProduct, NameSpace, ProductType, SortOrder, SortType, Status } from '../../utils/const';
import { filterCameras, sortCameras } from '../../utils/catalog-utils';


export const getCameras = (state: State): Product[] => state[NameSpace.Catalog].catalog;
export const getStatus = (state: State): Status => state[NameSpace.Catalog].status;

export const getSelectedSortType = (state: State): SortType | null => state[NameSpace.Catalog].sortType;
export const getSelectedSortOrder = (state: State): SortOrder | null => state[NameSpace.Catalog].sortOrder;

export const getCurrentCategory = (state: State): CategoryProduct | null => state[NameSpace.Filter].category;
export const getCurrentTypes = (state: State): ProductType[] => state[NameSpace.Filter].types;
export const getCurrentLevels = (state: State): LevelProduct[] => state[NameSpace.Filter].levels;
export const getCurrentMinPrice = (state: State): number => state[NameSpace.Filter].minPrice;
export const getCurrentMaxPrice = (state: State): number => state[NameSpace.Filter].maxPrice;

export const getSortedCameras = createSelector(
  [getCameras, getSelectedSortType, getSelectedSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);

export const getfilteredCameras = createSelector(
  [getSortedCameras, getCurrentCategory, getCurrentTypes, getCurrentLevels, getCurrentMinPrice, getCurrentMaxPrice],
  (cameras, category, types, levels, minPrice, maxPrice) => filterCameras(cameras, category, types, levels, minPrice, maxPrice)
);
