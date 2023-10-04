import { PromoProduct } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace, Status } from '../../utils/const';


export const getPromo = (state: State): PromoProduct[] => state[NameSpace.Promo].promo;
export const getStatus = (state: State): Status => state[NameSpace.Promo].status;
