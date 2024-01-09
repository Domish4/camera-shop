import { Provider } from 'react-redux';
import BasketSummary from './basket-summary';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../utils/mocks';

import { createMockStoreWithAPI } from '../../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);


describe('Component: basket summary', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <BasketSummary/>
      </Provider>,
    );


    expect(screen.getByTestId('basket-summary')).toBeInTheDocument();
  });
});
