import { Product } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';


export const getCamera = (state: State): Product | null => state[NameSpace.Camera].camera;
export const getStatus = (state: State): Status => state[NameSpace.Camera].status;
