import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { Provider } from 'react-redux';
import Banner from './banner';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../utils/const';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';


const mockStore = configureMockStore();
const cameras = makeFakeCameras();
const promo = [makeFakePromo()];
const history = createMemoryHistory();

const store = mockStore({
  [NameSpace.Promo]: {
    promo: promo,
    status: Status.Idle
  },
  [NameSpace.Catalog]: {
    catalog: cameras,
    status: Status.Idle
  }
});

describe('Component: banner', () => {

  it('should render banner correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Banner />
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Новинка/i)).toBeInTheDocument();
  });
});
