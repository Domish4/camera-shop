import { render, screen} from '@testing-library/react';
import CatalogSort from './catalog-sort';

describe('Component: catalog sort', () => {
  it('should render correctly', () => {

    render(
      <CatalogSort/>,
    );

    const containerElement = screen.getByTestId('catalog-sort');

    expect(containerElement).toBeInTheDocument();
  });
});
