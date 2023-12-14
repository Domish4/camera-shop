import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { DeepPartial } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { client, createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

export const createMockStoreWithAPI = (fakeState: DeepPartial<State>) => {
  const mockAPI = new MockAdapter(createAPI());
  const middlewares = [thunk.withExtraArgument(client)];

  const fakeStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof client, Action<string>>
  >(middlewares)(fakeState);

  return { fakeStore, mockAPI };
};
