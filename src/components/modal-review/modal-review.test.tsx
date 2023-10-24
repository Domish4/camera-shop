import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';

import HistoryRouter from '../history-router/history-router';
import ModalReview from './modal-review';
import { NameSpace, Status } from '../../utils/const';
import { makeFakeAddReview, makeFakeCamera, makeFakeCameras, makeFakeReviews } from '../../utils/mocks';

const mockStore = configureMockStore();
const reviews = makeFakeReviews();
const camera = makeFakeCamera();
const catalog = makeFakeCameras();
const addReview = makeFakeAddReview();

let isOpen = true;
const onClose = () => {
  isOpen = !isOpen;
};

describe('Component: modal Review', () => {
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
          <ModalReview
            isModalOpened={isOpen}
            onCloseModal={onClose}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
