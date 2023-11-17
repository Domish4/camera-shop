import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameras } from '../../utils/mocks';
import { NameSpace, SortOrder, SortType, Status } from '../../utils/const';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import FilterByPrice from './catalog-filter-price';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();
const mockCameras = makeFakeCameras();
const store = mockStore({
  [NameSpace.Catalog]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Sort]: {sortOrder: SortOrder.UP, sortType: SortType.Price},
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});
const history = createMemoryHistory();


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilterByPrice isReset/>
    </HistoryRouter>
  </Provider>
);
describe('Component: FilterByPrice', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  });
});
