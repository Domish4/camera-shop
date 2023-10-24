import { Product, PromoProduct, Review } from '../types/product-camera-type';
import { APIRoute, AppRoute, } from '../utils/const';
import { generatePath } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkOptions } from '../types/state';


export const getCatalogAction = createAsyncThunk<Product[], undefined, ThunkOptions>(
  'data/getCatalog',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Product[]>(APIRoute.Cameras);
    return data;

  }
);

export const getPromoAction = createAsyncThunk<PromoProduct[], undefined, ThunkOptions>(
  'data/getPromo',
  async (_arg, {extra: api }) => {

    const { data } = await api.get<PromoProduct[]>(AppRoute.Promo);
    return data;
  }
);

export const getCameraAction = createAsyncThunk<Product, string, ThunkOptions>(
  'data/getCamera',
  async (cameraId, { extra: api }) => {
    const { data } = await api.get<Product>(generatePath(APIRoute.Product, { cameraId: cameraId.toString() }));
    return data;

  }
);

export const getSimilarProductsAction = createAsyncThunk<Product[], string, ThunkOptions>(
  'data/getSimilarProducts',
  async (cameraId, { extra: api }) => {

    const { data } = await api.get<Product[]>(generatePath(APIRoute.Similar, { cameraId: cameraId.toString() }));

    return data;
  }
);

export const getReviewsAction = createAsyncThunk<Review[], string, ThunkOptions>(
  'data/getReviewss',
  async (cameraId, { extra: api }) => {

    const { data } = await api.get<Review[]>(generatePath(APIRoute.Reviews, { cameraId: cameraId.toString() }));
    return data;

  }

);

export const postReviewAction = createAsyncThunk<Review, Review & {onSuccess: (camera: null) => void}, ThunkOptions>(
  'data/postReview',
async ({onSuccess, cameraId, userName, advantage, disadvantage, review, rating}, { extra: api}) => {
  const {data} = await api.post<Review>(`${APIRoute.AddReview}`, {cameraId, userName, advantage, disadvantage, review, rating});
  onSuccess(null);
  return data;

},
);
