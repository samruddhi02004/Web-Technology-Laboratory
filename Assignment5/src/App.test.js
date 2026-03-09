import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app navbar and event list', () => {
  render(<App />);

  expect(screen.getByText(/college event management/i)).toBeInTheDocument();
  expect(screen.getByText(/all events/i)).toBeInTheDocument();
  expect(screen.getByText(/hackathon 2026/i)).toBeInTheDocument();
});
