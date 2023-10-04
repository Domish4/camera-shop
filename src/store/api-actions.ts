import { Product, PromoProduct, Review } from '../types/product-camera-type';
import { AppRoute, getAverageRate } from '../utils/const';
import { generatePath } from 'react-router-dom';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkOptions } from '../types/state';


export const getCatalogAction = createAsyncThunk<Product[], undefined, ThunkOptions>(
  'data/getCatalog',
  async (_arg, { extra: api }) => {

    const { data } = await api.get<Product[]>(AppRoute.Catalog);
    for (let i = 0; i < data.length; i++) {
      const reviews = await api.get<Review[]>(generatePath(AppRoute.Reviews, { cameraId: String(data[i].id) }));

      data[i].rating = getAverageRate(reviews.data);
    }

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
