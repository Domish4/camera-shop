import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera } from '../../utils/mocks';
import AddItem from './add-item';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const camera = makeFakeCamera();
let isOpen = true;
const onClose = () => {
  isOpen = !isOpen;
};

describe('Component: AddCameraModal', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddItem
            camera={camera}
            isModalOpened={isOpen}
            onClosePopup={onClose}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });
});
