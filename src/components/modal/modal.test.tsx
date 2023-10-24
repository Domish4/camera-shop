import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Modal from './modal';


const history = createMemoryHistory();

describe('Component: Modal', () => {
  it('should render correctly', () => {

    render(

      <HistoryRouter history={history}>
        <Modal isModalOpened onCloseClick={jest.fn()}>
          <h1>modal</h1>
        </Modal>
      </HistoryRouter>

    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
