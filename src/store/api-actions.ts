/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { OrderPost, Product, PromoProduct, Review } from '../types/product-camera-type';
import { APIRoute, AppRoute, Coupon, } from '../utils/const';
import { generatePath } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, ThunkOptions } from '../types/state';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { AxiosInstance } from 'axios';


export const getCatalogAction = createAsyncThunk<Product[], undefined, ThunkOptions>(
  'data/getCatalog',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<Product[]>(APIRoute.Cameras);
      return data;
    } catch(err) {
      toast.error('Что-то пошло не так. Попробуйте позже');
      throw err;
    }
  }
);

export const getPromoAction = createAsyncThunk<PromoProduct[], undefined, ThunkOptions>(
  'data/getPromo',
  async (_arg, {extra: api }) => {
    try {
      const { data } = await api.get<PromoProduct[]>(AppRoute.Promo);
      return data;
    } catch(err) {
      toast.error('Не удалось получить промо-продукт, попробуйте позже');
      throw err;
    }
  }
);

export const getCameraAction = createAsyncThunk<Product, string, ThunkOptions>(
  'data/getCamera',
  async (cameraId, { extra: api }) => {
    try {
      const { data } = await api.get<Product>(generatePath(APIRoute.Product, { cameraId: cameraId.toString() }));
      return data;
    } catch(err) {
      toast.error('Что-то пошло не так. Попробуйте еще раз');
      throw err;
    }
  }
);

export const getSimilarProductsAction = createAsyncThunk<Product[], string, ThunkOptions>(
  'data/getSimilarProducts',
  async (cameraId, { extra: api }) => {
    try {
      const { data } = await api.get<Product[]>(generatePath(APIRoute.Similar, { cameraId: cameraId.toString() }));
      return data;
    } catch(err) {
      toast.error('Что-то пошло не так. Попробуйте еще раз');
      throw err;
    }
  }
);

export const getReviewsAction = createAsyncThunk<Review[], string, ThunkOptions>(
  'data/getReviewss',
  async (cameraId, { extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(generatePath(APIRoute.Reviews, { cameraId: cameraId.toString() }));
      return data;
    } catch(err) {
      toast.error('Что-то пошло не так. Попробуйте еще раз');
      throw err;
    }
  }

);

export const postReviewAction = createAsyncThunk<Review, Review & {onSuccess: (camera: null) => void}, ThunkOptions>(
  'data/postReview',
async ({onSuccess, cameraId, userName, advantage, disadvantage, review, rating}, { extra: api}) => {
  try {
    const {data} = await api.post<Review>(`${APIRoute.AddReview}`, {cameraId, userName, advantage, disadvantage, review, rating});
    onSuccess(null);
    return data;
  } catch(err) {
    toast.error('Что-то пошло не так. Попробуйте еще раз');
    throw err;
  }
},
);

export const postDiscount = createAsyncThunk<number, Coupon, ThunkOptions>(
  'data/postDiscount',
  async (coupon, { extra: api }) => {
    const { data } = await api.post<number>(APIRoute.Coupon, { coupon });
    return data;
  }
);


export const postOrder = createAsyncThunk<void, OrderPost, {
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>(
  'camera/sendOrderAction',
  async ({camerasIds, coupon}, {extra: api}) => {
    try {
      await api.post(APIRoute.Order, {camerasIds, coupon});
    }catch {
      toast.error('Ошибка оформления заказа');
    }
  },
);
