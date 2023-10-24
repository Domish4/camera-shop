import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { NameSpace, Status } from '../../utils/const';
import CatalogMain from './catalog-main';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockPromo = makeFakePromo();
const store = mockStore({
  [NameSpace.Catalog]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Promo]: {camera: mockPromo, status: Status.Success}
});

const history = createMemoryHistory();

describe('Page: Catalog', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogMain />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-main')).toBeInTheDocument();
  });
});
