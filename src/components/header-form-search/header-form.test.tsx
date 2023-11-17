import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import HistoryRouter from '../history-router/history-router';
import HeaderFormSearch from './header-form-search';
import { makeFakeCameras } from '../../utils/mocks';
import { NameSpace, Status } from '../../utils/const';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const mockCameras = makeFakeCameras();
const store = mockStore({
  [NameSpace.Catalog]: {catalog: mockCameras, status: Status.Success},
});


describe('Component: SearchForm', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderFormSearch />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
  });
});
