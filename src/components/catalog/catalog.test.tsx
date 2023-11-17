import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Catalog from './catalog';
import { NameSpace, Status } from '../../utils/const';
import { makeFakeCameras } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockCameras = makeFakeCameras();


describe('Component: Catalog', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

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
      [NameSpace.Filter]: {
        category: null,
        types: [],
        levels: [],
        minPrice: 0,
        maxPrice: 0,
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-test')).toBeInTheDocument();
  });
});
