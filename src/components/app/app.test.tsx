import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { makeFakeReviews } from '../../utils/mocks';
import { makeFakeAddReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace } from '../../utils/const';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {render, screen} from '@testing-library/react';
import { generatePath } from 'react-router-dom';

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockPromo = makeFakePromo();
const mockProduct = makeFakeCamera();
const mockReviews = makeFakeReviews();
const mockReview = makeFakeAddReview();
const store = mockStore({
  [NameSpace.Catalog]: mockCameras,
  [NameSpace.Promo]: mockPromo,
  [NameSpace.Camera]: mockProduct,
  [NameSpace.Similar]: mockCameras,
  [NameSpace.Reviews]: mockReviews,
  [NameSpace.AddReview]: mockReview
});


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog/page_1"', () => {
    history.push(generatePath(AppRoute.Catalog, { page: 'page_1' }));

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/product/1"', () => {
    history.push(`${AppRoute.Product}/1`);

    render(fakeApp);

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});
