import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';
import AddItemSuccess from './add-item-success';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
let isOpen = true;

const onClose = () => {
  isOpen = !isOpen;
};

describe('Component: modal catalog add to cart item success', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddItemSuccess isModalOpened={isOpen} onCloseModal={onClose}/>
        </HistoryRouter>
      </Provider>,
    );

    const screenElement = screen.getByText(/Товар успешно добавлен в корзину/i);

    expect(screenElement).toBeInTheDocument();
  });
});
