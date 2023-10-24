import { render, screen} from '@testing-library/react';
import HeaderFormSearch from './header-form-search';

describe('Component: header form search', () => {
  it('should render correctly', () => {

    render(
      <HeaderFormSearch/>,
    );

    const containerElement = screen.getByTestId('form-search');

    expect(containerElement).toBeInTheDocument();
  });
});
