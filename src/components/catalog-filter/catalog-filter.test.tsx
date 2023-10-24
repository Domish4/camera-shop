import { render, screen} from '@testing-library/react';
import CatalogFilter from './catalog-filter';

describe('Component: catalog filter', () => {
  it('should render correctly', () => {

    render(
      <CatalogFilter/>,
    );

    const containerElement = screen.getByTestId('catalog-filter');

    expect(containerElement).toBeInTheDocument();
  });
});
