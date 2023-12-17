import { createSelector } from '@reduxjs/toolkit';
import { Coupon, NameSpace, Status } from '../../utils/const';
import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { productsAdapter } from './shopping-cart-slice';

export const {
  selectAll: selectAllBasketProducts,
} = productsAdapter.getSelectors<State>((state) => state[NameSpace.Basket]);

export const getShopCartCameras = (state: State): Product[] => state[NameSpace.Basket].basketCameras;
export const getTotalCount = (state: State): number => state[NameSpace.Basket].totalCount;
export const getDiscountPercent = (state: State): number => state[NameSpace.Basket].discount;
export const getPostDiscountStatus = (state: State): Status => state[NameSpace.Basket].discountStatus;
export const getCoupon = (state: State): Coupon | null => state[NameSpace.Basket].coupon;
export const getPostOrderStatus = (state: State): Status => state[NameSpace.Basket].orderStatus;
export const getErrorBasketStatus = (state: State): boolean | null =>
  state[NameSpace.Basket].isError;

export const getDiscountStatus = createSelector([getPostDiscountStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getOrderStatus = createSelector([getPostOrderStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));
