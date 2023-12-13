import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { catalogSlice } from './catalog/catalog.slice';
import { promoSlice } from './promo/promo.slice';
import { cameraSlice } from './camera/camera-slice';
import { SimilarProductSlice } from './similar-camera/similar-camera-slice';
import { reviewSlice } from './review/review-slice';
import { shoppingCartSlice } from './shopping-cart/shopping-cart-slice';


export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Camera]: cameraSlice.reducer,
  [NameSpace.Similar]: SimilarProductSlice.reducer,
  [NameSpace.Reviews]: reviewSlice.reducer,
  [NameSpace.Filter]: catalogSlice.reducer,
  [NameSpace.Sort]: catalogSlice.reducer,
  [NameSpace.Basket]: shoppingCartSlice.reducer
});
