import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppRoute, NameSpace, Status } from '../../utils/const';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import {render, screen} from '@testing-library/react';
import { makeFakeAddReview, makeFakeCamera, makeFakeCameras, makeFakePromo, makeFakeReviews } from '../../utils/mocks';


const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const reviews = makeFakeReviews();
const camera = makeFakeCamera();
const mockCameras = makeFakeCameras();
const addReview = makeFakeAddReview();
const promo = [makeFakePromo()];

const store = mockStore({
  [NameSpace.Reviews]: {
    reviews: reviews,
    status: Status.Success
  },
  [NameSpace.Camera]: {
    camera: camera,
    status: Status.Success
  },
  [NameSpace.Catalog]: {
    catalog: mockCameras,
    maxPrice: 0,
    minPrice: 0,
    sortOrder: null,
    sortType: null,
    category: null,
    types: [],
    levels: [],
    currentPage: null,
    status: Status.Success

  },
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
  },

  [NameSpace.AddReview]: {
    AddReview: addReview,
    status: Status.Success
  },
  [NameSpace.Promo]: {
    promo: promo,
    status: Status.Success
  },
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
});
