export type Product = {
id: number;
name: string;
vendorCode: string;
type: string;
category: string;
description: string;
level: string;
price: number;
rating: number;
reviewCount: number;
previewImg: string;
previewImg2x: string;
previewImgWebp: string;
previewImgWebp2x: string;
count?: number;
totalPrice?: number;
}

export type PromoProduct = {
id: number;
name: string;
previewImg: string;
previewImg2x: string;
previewImgWebp: string;
previewImgWebp2x: string;
}

export type Review = {
id: string;
createAt: string;
cameraId: number;
userName: string;
advantage: string;
disadvantage: string;
review: string;
rating: number;
}

export type AddReview = {
    cameraId: number;
    userName: string;
    advantage: string;
    disadvantage: string;
    review: string;
    rating: number;
  }

export type ProductShoppingCart = Product & { count: number; totalPrice: number }

export type OrderPost = {
  camerasIds: number[];
  coupon: string | null;
}

