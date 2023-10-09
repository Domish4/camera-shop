import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { catalogSlice } from './catalog/catalog.slice';
import { promoSlice } from './promo/promo.slice';
import { cameraSlice } from './camera/camera-slice';
import { SimilarProductSlice } from './similar-camera/similar-camera-slice';


export const rootReducer = combineReducers({
  [NameSpace.Catalog]: catalogSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Camera]: cameraSlice.reducer,
  [NameSpace.Similar]: SimilarProductSlice.reducer
});
