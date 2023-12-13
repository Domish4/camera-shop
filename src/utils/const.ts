
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
  AddReview = 'ADD_REVIEW',
  Sort = 'SORT',
  Basket = 'BASKET',

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

export enum LevelProduct {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

export enum ProductType {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Instant = 'Моментальная',
  Collection = 'Коллекционная',
}

export enum CategoryProduct {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
}

export const categoryProductName = {
  [CategoryProduct.Photocamera]: 'Фотокамера',
  [CategoryProduct.Videocamera]: 'Видеокамера'
};

export const categoryQueryValue = {
  [CategoryProduct.Videocamera]: 'videocamera',
  [CategoryProduct.Photocamera]: 'photocamera'
};

export const typeQueryValue = {
  [ProductType.Collection]: 'collection',
  [ProductType.Instant]: 'instant',
  [ProductType.Digital]: 'digital',
  [ProductType.Film]: 'film',
};

export const levelQueryValue = {
  [LevelProduct.Zero]: 'zero',
  [LevelProduct.Amateur]: 'amateur',
  [LevelProduct.Professional]: 'professional'
};

export const numberForValidity = {
  minLength: 2,
  maxLength: 160,
} as const;

export enum Coupon {
  First = 'camera-333',
  Second = 'camera-444',
  Third = 'camera-555'
}

export const MIN_PRODUCT = 1;
export const MAX_PRODUCT = 99;
