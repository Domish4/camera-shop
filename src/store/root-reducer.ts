import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../utils/const';
import { catalogSlice } from './catalog/catalog.slice';
import { promoSlice } from './promo/promo.slice';


export const rootReducer = combineReducers({
  [NameSpace.Camera]: catalogSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer
});
