import { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { NameSpace, Status, productsInShopCart } from './const';


export const getInitialEntityAdapterState = <T, S extends object>(
  adapter: EntityAdapter<T>,
  initialState: S,
  localStorageResult?: string | null
) => {

  if (localStorageResult) {
    const result = JSON.parse(localStorageResult) as EntityState<T> & S;

    return adapter.setAll(
      adapter.getInitialState({ ...result }),
      result.entities as Record<EntityId, T>
    );
  }


  return adapter.getInitialState<S>(initialState);
};

export const saveToLocalStorage = (state: State[NameSpace.Basket]) => {
  const data = {
    ...state,
    discount: 0,
    discountStatus: Status.Idle,
    coupon: 0,
    orderStatus: Status.Idle
  } as State[NameSpace.Basket];
  localStorage.setItem(productsInShopCart, JSON.stringify(data));

};
