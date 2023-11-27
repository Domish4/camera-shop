import { Product } from '../types/product-camera-type';
import { CategoryProduct, LevelProduct, ProductType, SortOrder, SortType } from './const';


export const filterCamerasByPrice = (cameras: Product[], minPrice: number, maxPrice: number): Product[] => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  return cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);
};

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

export const filterCamerasByCategory = (cameras: Product[], category: CategoryProduct | null): Product[] => {
  if (!category) {
    return cameras;
  }
  const filteredCameras = cameras.filter((camera) => camera.category === category);
  return filteredCameras;
};


export const filterCamerasByTypes = (cameras: Product[], types: ProductType[]): Product[] => {
  if (!types.length) {
    return cameras;
  }

  const filteredCameras = cameras.filter((camera) => types.includes(camera.type as ProductType));

  return filteredCameras;
};

export const filterCamerasByLevels = (cameras: Product[], levels: LevelProduct[]): Product[] => {
  if (!levels.length) {
    return cameras;
  }

  const filteredCameras = cameras.filter((camera) => levels.includes(camera.level as LevelProduct));

  return filteredCameras;
};

export const getPriceProduct = (cameras: Product[], type: 'max' | 'min'): string => {
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

export const filterCameras = (
  cameras: Product[],
  category: CategoryProduct | null,
  types: ProductType[],
  levels: LevelProduct[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  const filteredCamerasByCategory = filterCamerasByCategory(cameras, category);
  const filteredCamerasByTypes = filterCamerasByTypes(filteredCamerasByCategory, types);
  const filteredCamerasByLevels = filterCamerasByLevels(filteredCamerasByTypes, levels);
  const filteredCamerasByPrice = filterCamerasByPrice(filteredCamerasByLevels, minPrice, maxPrice);

  return filteredCamerasByPrice;
};
