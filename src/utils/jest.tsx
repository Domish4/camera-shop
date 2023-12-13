import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { createMemoryHistory } from 'history';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import HistoryRouter from '../components/history-router/history-router';
import { HelmetProvider } from 'react-helmet-async';
import { DeepPartial } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { client, createAPI } from '../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';


const mockStore = configureMockStore<State>()({});
const history = createMemoryHistory();

type TestWrapperProps = {
  children: ReactNode;
  fakeStore?: typeof mockStore;
  fakeHistory?: typeof history;
}


export const ProviderWrapper = ({ children, fakeStore, fakeHistory }: TestWrapperProps) => {
  const store = configureMockStore<State>()({});
  const brHistory = createMemoryHistory();

  return (
    <Provider store={fakeStore || store}>
      <HistoryRouter history={fakeHistory || brHistory}>
        <HelmetProvider>
          {children}
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  );
};

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
