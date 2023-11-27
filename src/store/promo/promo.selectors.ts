import { PromoProduct } from '../../types/product-camera-type';
import { State } from '../../types/state';
import { NameSpace } from '../../utils/const';


export const getPromo = (state: State): PromoProduct[] => state[NameSpace.Promo].promo;
