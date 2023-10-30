import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';
import { getSortedProducts } from '../../utils/catalog-utils';


export const getCameras = (state: State): Product[] => state[NameSpace.Catalog].catalog;
export const getStatus = (state: State): Status => state[NameSpace.Catalog].status;


export const getRenderedProducts = createSelector([getCameras], (catalog) => getSortedProducts(catalog));
