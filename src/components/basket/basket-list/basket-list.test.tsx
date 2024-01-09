import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import BasketList from './basket-list';
import { NameSpace, Status } from '../../../utils/const';
import { makeFakeCameras } from '../../../utils/mocks';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';

const mockCameras = makeFakeCameras();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Basket]: {
    basketCameras: [],
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    discountStatus: Status.Success,
    coupon: 0,
    orderStatus: Status.Idle
  },
  [NameSpace.Catalog]: {
    catalog: mockCameras,
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: 0,
    status: Status.Success

  },
});

describe('Component: basket list', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketList productsInBasket={mockCameras}/>
        </HistoryRouter>
      </Provider>,
    );

    const containerElement = screen.getByTestId('basket-list');

    expect(containerElement).toBeInTheDocument();
  });
});
