import { Product } from '../types/product-camera-type';
import { SortOrder, SortType } from './const';

export const getSortedProducts = (products: Product[]): Product[] => [...products].sort((a, b) => a.price - b.price);


export const getPrice = (cameras: Product[], type: 'max' | 'min'): string => {
  if (!cameras.length) {
    return '';
  }

  const sortedCameras = [...cameras].sort((a, b) => a.price - b.price);

  if (type === 'max' && sortedCameras.length) {
    return sortedCameras[sortedCameras.length - 1].price.toString();
  } else {
    return sortedCameras[0].price.toString();
  }
};

export const filterCamerasByPrice = (cameras: Product[], minPrice: number, maxPrice: number): Product[] => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  return cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
};

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const sortCameras = (cameras: Product[], sortType: SortType | null, sortOrder: SortOrder | null): Product[] => {
  let sortedCamerasByType: Product[] = [];

  switch (sortType) {
    case SortType.Popular:
      sortedCamerasByType = [...cameras].sort((a, b) => b.rating - a.rating);
      break;
    case SortType.Price:
      sortedCamerasByType = [...cameras].sort((a, b) => b.price - a.price);
      break;
    default:
      sortedCamerasByType = [...cameras];
      break;
  }

  let sortedCamerasByOrder: Product[] = [];

  switch (sortOrder) {
    case SortOrder.UP:
      sortedCamerasByOrder = sortedCamerasByType.reverse();
      break;
    case SortOrder.Down:
      sortedCamerasByOrder = sortedCamerasByType;
      break;
    default:
      sortedCamerasByOrder = [...cameras];
      break;
  }

  return sortedCamerasByOrder;
};
