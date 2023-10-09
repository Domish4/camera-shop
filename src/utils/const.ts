import { Review } from '../types/product-camera-type';

export enum NameSpace {
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Catalog = 'CATALOG',
  Reviews = 'REVIEW',
  Coupon = 'COUPON',
  Order = 'ORDER',
  Notification = 'NOTIFICATION',
  Filter = 'FILTER',
  Similar = 'SIMILAR'

}

export const tabNames = ['Характеристики', 'Описание'] as const;


export enum AppRoute {
    Main = '/',
    Catalog = '/catalog/:page',
    Product = '/cameras/:id',
    Similar = '/cameras/:cameraId/similar',
    Promo = '/promo',
    Reviews = '/cameras/:cameraId/reviews',
    AddReview = '/reviews',
    Coupon = '/coupons',
    Order = '/orders',
}

export enum APIRoute {
  Cameras = '/cameras',
  Product = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Promo = '/promo',
  Reviews = '/reviews',
  Coupon = '/coupons',
  Order = '/orders'
}

export const getAverageRate = (reviews: Review[]): number => {
  const sumRate = reviews.reduce((acc, review) => acc + review.rating, 0);

  return Math.ceil(sumRate / reviews.length);
};

export enum Status {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error'
  }

export const MAX_CAMERAS_CARD = 9;
