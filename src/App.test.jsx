import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App';

describe('App', () => {
  it('renderiza sem quebrar quando o navegador não expõe matchMedia', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: undefined,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(screen.getByText('O CLARIM DIÁRIO')).toBeInTheDocument();
  });
});
