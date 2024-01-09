import { render, screen} from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameras } from '../../../utils/mocks';
import { NameSpace, SortOrder, SortType, Status } from '../../../utils/const';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';


const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockCameras = makeFakeCameras();

const store = mockStore({
  [NameSpace.Catalog]: {
    catalog: mockCameras,
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: 0,
    status: Status.Success
  },
  [NameSpace.Sort]: {
    sortOrder: SortOrder.UP,
    sortType: SortType.Price
  },
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});

describe('Component: catalog filter', () => {
  it('should render correctly', () => {

    render((
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogFilter />,
        </HistoryRouter>
      </Provider>
    ));

    const containerElement = screen.getByTestId('catalog-filter');

    expect(containerElement).toBeInTheDocument();
  });
});
