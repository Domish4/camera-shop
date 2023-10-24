import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ProductCard from './product-card';


const mockCamera = makeFakeCamera();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <ProductCard camera={mockCamera}/>
  </HistoryRouter>
);

describe('Component: product-card', () => {

  it('should render product card correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});
