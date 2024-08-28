import { render, screen } from '@testing-library/react';
import AppRoutes from './AppRoutes';

test('renders learn react link', () => {
  render(<AppRoutes isLoggedIn={false}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
