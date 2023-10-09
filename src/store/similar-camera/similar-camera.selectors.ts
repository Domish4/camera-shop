import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';


export const getSimilarCameras = (state: State): Product[] => state[NameSpace.Similar].similarProduct;
export const getStatus = (state: State): Status => state[NameSpace.Similar].status;
