import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { createAPI } from '../../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace, Status } from '../../../utils/const';
import ReviewCard from './review-card';
import { makeFakeReview } from '../../../utils/mocks';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockReviews = makeFakeReview();

const store = mockStore({
  [NameSpace.AddReview]: {review: mockReviews, status: Status.Success},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ReviewCard reviewCard={mockReviews} />
    </HistoryRouter>
  </Provider>
);

describe('Component: review-card ', () => {

  it('should render review-card correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('review-card')).toBeInTheDocument();
  });
});
