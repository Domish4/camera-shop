import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCameras } from '../../utils/mocks';
import { NameSpace, Status } from '../../utils/const';
import SimilarCards from './similar-cards';

const mockStore = configureMockStore();
const similarCameras = makeFakeCameras();

describe('Component: SimilarProducts', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Similar]: {
        similarCameras: similarCameras,
        status: Status.Idle
      }
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarCards similarCameras={similarCameras}/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
