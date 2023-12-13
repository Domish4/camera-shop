import { render, screen} from '@testing-library/react';
import { makeFakeCamera } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import BasketRemoveItem from './basket-remove-item-modal';


const mockCamera = makeFakeCamera();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

let isOpen = true;
const onClose = () => {
  isOpen = !isOpen;
};


describe('Component: modal basket remove item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketRemoveItem isOpen={isOpen} product={mockCamera} onCloseClick={onClose}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();

  });
});
