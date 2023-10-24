import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-router/history-router';

const mockStore = configureMockStore<State>()({});
const history = createMemoryHistory();

type TestWrapperProps = {
  children: ReactNode;
  fakeStore?: typeof mockStore;
  fakeHistory?: typeof history;
  }

function ProviderWrapper({ children, fakeStore, fakeHistory }: TestWrapperProps) {
  const store = configureMockStore<State>()({});
  const browserHistory = createMemoryHistory();

  return (
    <Provider store={fakeStore || store}>
      <HistoryRouter history={fakeHistory || browserHistory}>
        {children}
      </HistoryRouter>
    </Provider>
  );
}

export default ProviderWrapper;
