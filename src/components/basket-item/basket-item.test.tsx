import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen} from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';
import { Provider } from 'react-redux';
import BasketItem from './basket-item';
import { NameSpace, Status } from '../../utils/const';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({
  [NameSpace.Basket]: {
    basketCameras: [],
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    discountStatus: Status.Success,
    coupon: 0,
    orderStatus: Status.Idle
  }
});
const product = makeFakeCamera();
describe('Component: basket item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketItem product={product}/>
        </HistoryRouter>

      </Provider>,
    );

    const containerElement = screen.getByTestId('basket-item');

    expect(containerElement).toBeInTheDocument();
  });
});
