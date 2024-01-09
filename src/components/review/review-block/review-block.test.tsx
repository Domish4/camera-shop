import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';
import ReviewBlock from './review-block';
import { makeFakeAddReview, makeFakeCamera, makeFakeCameras, makeFakeReviews } from '../../../utils/mocks';
import { NameSpace, Status } from '../../../utils/const';

const mockStore = configureMockStore();
const reviews = makeFakeReviews();
const camera = makeFakeCamera();
const catalog = makeFakeCameras();
const addReview = makeFakeAddReview();

describe('Component: ReviewBlock', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Reviews]: {
        reviews: reviews,
        status: Status.Success
      },
      [NameSpace.Camera]: {
        camera: camera,
        status: Status.Success
      },
      [NameSpace.Catalog]: {
        catalog: catalog,
        status: Status.Success
      },
      [NameSpace.AddReview]: {
        AddReview: addReview,
        status: Status.Success
      },
    });


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewBlock />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });
});
