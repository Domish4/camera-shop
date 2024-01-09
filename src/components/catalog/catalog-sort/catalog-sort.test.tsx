import { render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CatalogSort from './catalog-sort';
import { NameSpace, SortOrder, SortType } from '../../../utils/const';
import { createAPI } from '../../../services/api';
import HistoryRouter from '../../history-router/history-router';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Sort]: {sortOrder: SortOrder.UP, sortType: SortType.Price},
  [NameSpace.Catalog]: {
    SortType: null,
    SortOrder: null
  }
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CatalogSort />
    </HistoryRouter>
  </Provider>
);

describe('Component: catalog sort', () => {
  it('should render correctly', () => {

    render(fakeApp);

    const containerElement = screen.getByTestId('catalog-sort');

    expect(containerElement).toBeInTheDocument();
  });
});
