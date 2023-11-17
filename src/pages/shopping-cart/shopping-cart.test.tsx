import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import ShoppingCart from './shopping-cart';
import { makeFakeCameras } from '../../utils/mocks';
import { NameSpace, Status } from '../../utils/const';

const mockStore = configureMockStore([thunk]);
const mockCameras = makeFakeCameras();

describe('Page: Basket', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Catalog]: {catalog: mockCameras, status: Status.Success},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ShoppingCart />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('shopping-cart')).toBeInTheDocument();
  });
});
