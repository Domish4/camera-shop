import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { Provider } from 'react-redux';
import ModalProductBasketSuccess from './basket-success-modal';
import { render, screen } from '@testing-library/react';
import { NameSpace, Status } from '../../../utils/const';

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
  }
});
const history = createMemoryHistory();
describe('Component: modal product basket success', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalProductBasketSuccess/>
        </HistoryRouter>
      </Provider>,
    );

    const screenElement = screen.getByText(/Спасибо за покупку/i);

    expect(screenElement).toBeInTheDocument();
  });
});
