import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';


export const getCameras = (state: State): Product[] => state[NameSpace.Camera].catalog;
export const getStatus = (state: State): Status => state[NameSpace.Camera].status;
