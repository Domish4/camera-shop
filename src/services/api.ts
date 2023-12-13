import axios, { AxiosInstance } from 'axios';
import { Product, PromoProduct, Review } from '../types/product-camera-type';
import { APIRoute, Coupon } from '../utils/const';
import { generatePath } from 'react-router-dom';

const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export const client = {
  getCatalogAction: () =>
    createAPI().get<Product[]>(APIRoute.Cameras),
  getPromoAction: () =>
    createAPI().get<PromoProduct>(APIRoute.Promo),
  getCameraInfoAction: (cameraId: string) => {
    createAPI().get<Product>(generatePath(APIRoute.Product, { cameraId: cameraId.toString() }));
    createAPI().get<Review[]>(generatePath(APIRoute.Reviews, { cameraId: String(cameraId) }));
  },
  getSimilarProductsAction: (cameraId: string) =>
    createAPI().get<Product[]>(generatePath(APIRoute.Similar, { cameraId: cameraId.toString() })),
  getReviewsAction: (cameraId: string) =>
    createAPI().get<Review[]>(generatePath(APIRoute.Reviews, { cameraId: cameraId.toString() })),
  postAddReviewAction: (body: Review) =>
    createAPI().post<Review>(`${APIRoute.AddReview}`,body),
  postDiscount: (coupon: Coupon) =>
    createAPI().post<number>(APIRoute.Coupon, { coupon }),
  postOrder: (camerasIds: number[], coupon: Coupon | 0 | null) =>
    createAPI().post<number>(APIRoute.Order, { camerasIds, coupon }),
};
