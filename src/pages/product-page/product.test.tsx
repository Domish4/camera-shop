import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeAddReview, makeFakeCamera, makeFakeCameras, makeFakeReviews } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { NameSpace, Status } from '../../utils/const';
import ProductPage from './product-page';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockProduct = makeFakeCamera();
const mockReviews = makeFakeReviews();
const catalog = makeFakeCameras();
const addReview = makeFakeAddReview();


const store = mockStore({
  [NameSpace.Camera]: {product: mockProduct, status: Status.Success},
  [NameSpace.Similar] : {similarProducts: mockCameras, status: Status.Success},
  [NameSpace.Reviews]: {reviews: mockReviews, status: Status.Success},
  [NameSpace.Catalog]: {
    catalog: catalog,
    status: Status.Success
  },
  [NameSpace.AddReview]: {
    AddReview: addReview,
    status: Status.Success
  },
});


const history = createMemoryHistory();

describe('Page Product', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );
    waitForElementToBeRemoved(() => expect(screen.getByTestId('loader')));

    waitFor(() => {
      expect(screen.getByTestId('product-page')).toBeInTheDocument();
    });
  });
});
