import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, SortOrder, SortType, Status } from '../../utils/const';
import { getSortedProducts, sortCameras } from '../../utils/catalog-utils';


export const getCameras = (state: State): Product[] => state[NameSpace.Catalog].catalog;
export const getStatus = (state: State): Status => state[NameSpace.Catalog].status;

export const getSelectedSortType = (state: State) : SortType | null =>
  state[NameSpace.Catalog].sortType;

export const getSelectedSortOrder = (state: State) : SortOrder | null =>
  state[NameSpace.Catalog].sortOrder;


export const getSortedCameras = createSelector(
  [getCameras, getSelectedSortType, getSelectedSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);

