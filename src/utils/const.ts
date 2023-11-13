
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

export enum AppRoute {
    Main = '/',
    Catalog = '/catalog/',
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

export const DEFAULT_TAB = '?tab=description';


export enum SortType {
  Price = 'по цене',
  Popular = 'по популярности',
}

export enum SortOrder {
  UP = 'По возрастанию',
  Down = 'По убыванию',
}

export const sortOrderQueryValue = {
  [SortOrder.UP]: 'up',
  [SortOrder.Down]: 'down'
};
