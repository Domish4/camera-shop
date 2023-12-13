import { Product } from '../types/product-camera-type';

export const getTotalProductPrice = (price: number, count?: number) => {
  if (!count) {
    return price;
  }

  return price * count;
};

export const getTotalPrice = (cameras: Product[]) => cameras.reduce((acc, camera) => {
  const productTotalPrice = getTotalProductPrice(camera.price, camera.count);

  return acc + productTotalPrice;
}, 0);

export const getDiscount = (totalPrice: number, discount: number) => Math.round(totalPrice / 100 * discount);

export const getFinalPrice = (totalPrice: number, discount: number) => totalPrice - discount;
