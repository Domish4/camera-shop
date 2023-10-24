import { Review } from '../types/product-camera-type';

export enum NameSpace {
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Catalog = 'CATALOG',
  Reviews = 'REVIEWS',
  Coupon = 'COUPON',
  Order = 'ORDER',
  Notification = 'NOTIFICATION',
  Filter = 'FILTER',
  Similar = 'SIMILAR',
  AddReview = 'ADD_REVIEW'

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
    ShopCart = '/shopping-cart'
}

export enum APIRoute {
  Cameras = '/cameras',
  Product = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Promo = '/promo',
  Reviews = 'cameras/:cameraId/reviews',
  Coupon = '/coupons',
  Order = '/orders',
  AddReview = '/reviews'
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

export enum KeyCode {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape'
}
