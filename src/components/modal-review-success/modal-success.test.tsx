import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { NameSpace, Status } from '../../utils/const';
import ModalProductReviewSuccess from './modal-review-success';

const mockStore = configureMockStore();

describe('Component: ReviewSuccessModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: [],
        status: Status.Idle
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalProductReviewSuccess />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Спасибо за отзыв/i)).toBeInTheDocument();
  });
});
