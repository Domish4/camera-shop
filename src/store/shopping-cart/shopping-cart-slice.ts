import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Product, ProductShoppingCart } from '../../types/product-camera-type';
import { Coupon, NameSpace, Status } from '../../utils/const';
import { getInitialEntityAdapterState, saveToLocalStorage } from '../../utils/local-storage';
import { postDiscount, postOrder } from '../api-actions';

export type ShoppingCartSlice = {
    basketCameras: Product[];
    totalCount: number;
    totalPrice: number;
    discount: number;
    discountStatus: Status;
    coupon: Coupon | 0;
    orderStatus: Status;
  };

export const initialState: ShoppingCartSlice = {
  basketCameras: [],
  totalCount: 0,
  totalPrice: 0,
  discount: 0,
  discountStatus: Status.Idle,
  coupon: 0,
  orderStatus: Status.Idle
};

export const productsAdapter = createEntityAdapter<ProductShoppingCart>();

const localStorageResult = localStorage.getItem('LOCAL_STORAGE');

const stateWithAdapter = getInitialEntityAdapterState(productsAdapter, initialState, localStorageResult);

export const shoppingCartSlice = createSlice({
  name: NameSpace.Basket,
  initialState: stateWithAdapter,
  reducers: {
    addProduct: (state, action: {payload: Product}) => {

      const product = state.entities[action.payload.id];
      const findedProduct = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (product && findedProduct?.count) {
        product.count ++;
        findedProduct.count ++;
        findedProduct.totalPrice = findedProduct.count * findedProduct.price;
        product.totalPrice = product.count * product.price;
        state.totalPrice += product.price;
      } else {
        state.basketCameras.push({ ...action.payload, count: 1 });
        state.totalPrice += action.payload.price;
        productsAdapter.addOne(state, { ...action.payload, count: 1, totalPrice: action.payload.price });
      }

      state.totalCount++;

      saveToLocalStorage(state);
    },
    decrementProductCount: (state, action: {payload: Product}) => {


      const product = state.entities[action.payload.id];
      const findedProduct = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (product && findedProduct && findedProduct.count) {
        product.count--;
        product.totalPrice = product.count * product.price;

        state.totalCount--;
        state.totalPrice -= product.price;

        findedProduct.count--;

        saveToLocalStorage(state);
      }

    },
    removeProduct: (state, action: {payload: Product}) => {
      const product = state.entities[action.payload.id];
      if (product) {
        state.totalCount -= product.count;
        state.totalPrice -= product.totalPrice;
      }

      state.basketCameras = state.basketCameras.filter((camera) => camera.id !== action.payload.id);

      productsAdapter.removeOne(state, action.payload.id);

      saveToLocalStorage(state);

    },
    setCameraCount: (state, action: {payload: { id: number; count: number }}) => {
      const product = state.entities[action.payload.id];
      const findedProduct = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (product && findedProduct) {
        state.totalCount -= product.count;
        product.count = action.payload.count;

        state.totalPrice -= product.totalPrice;
        product.totalPrice = product.count * product.price;

        state.totalCount += product.count;
        state.totalPrice += product.totalPrice;

        findedProduct.count = action.payload.count;

        saveToLocalStorage(state);
      }
    },
    setCoupon: (state, action: {payload: Coupon}) => {
      state.coupon = action.payload;
    },
    resetOrderStatus: (state) => {
      state.orderStatus = Status.Idle;
    },
    resetBasket() {
      localStorage.removeItem('LOCAL_STORAGE');
      return productsAdapter.getInitialState(initialState);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(postDiscount.pending, (state) => {
        state.discountStatus = Status.Loading;
      })
      .addCase(postDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.discountStatus = Status.Success;
      })
      .addCase(postDiscount.rejected, (state) => {
        state.discountStatus = Status.Error;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderStatus = Status.Loading;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.basketCameras = [];
        state.totalCount = 0;
        state.discount = 0;
        state.coupon = 0;
        state.orderStatus = Status.Success;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderStatus = Status.Error;
      });
  }
});
export const {
  addProduct,
  decrementProductCount,
  removeProduct,
  setCameraCount,
  setCoupon,
  resetOrderStatus,
  resetBasket
} = shoppingCartSlice.actions;
