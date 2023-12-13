import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import ShoppingCart from './shopping-cart';
import { createMockStore} from '../../utils/mocks';
import { createMockStoreWithAPI } from '../../utils/jest';

const history = createMemoryHistory();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);


describe('Page: Basket', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
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
