import { Product } from '../types/product-camera-type';

export const getSortedProducts = (products: Product[]): Product[] => [...products].sort((a, b) => a.price - b.price);


