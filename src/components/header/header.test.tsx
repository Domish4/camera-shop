import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import {makeFakeCameras } from '../../utils/mocks';
import { NameSpace, Status } from '../../utils/const';

const mockStore = configureMockStore();
const cameras = makeFakeCameras();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Catalog]: {
        catalog: cameras,
        status: Status.Success
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('header-test')).toBeInTheDocument();
  });
});
