import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ProductTabs from './product-tabs';


const mockCamera = makeFakeCamera();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <ProductTabs camera={mockCamera}/>
  </HistoryRouter>
);

describe('Component: product-tabs', () => {

  it('should render product tabs correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-tabs')).toBeInTheDocument();
  });
});
