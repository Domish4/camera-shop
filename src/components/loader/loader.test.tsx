import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import Loader from './loader';

const mockStore = configureMockStore();

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Loader />
        </HistoryRouter>
      </Provider>
    );

    const containerElement = screen.getByText(/Loading .../i);

    expect(containerElement).toBeInTheDocument();
  });
});
