import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ProductCard from './product-card';
import { random } from 'faker';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../utils/const';


const mockCamera = makeFakeCamera();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Basket]: {
    basketCameras: [],
    totalCount: 0,
    totalPrice: 0,
    discount: 0,
    discountStatus: Status.Success,
    coupon: 0,
    orderStatus: Status.Success
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ProductCard className={random.word()} camera={mockCamera}/>
    </HistoryRouter>
  </Provider>

);

describe('Component: product-card', () => {

  it('should render product card correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});
