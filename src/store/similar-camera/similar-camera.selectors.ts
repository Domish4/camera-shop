import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';

export const getSimilarCameras = (state: State): Product[] => state[NameSpace.Similar].similarProduct;
