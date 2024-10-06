import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { render } from 'test/utils';
import { describe, vi } from 'vitest';

import { ROUTES } from 'utils/constants/routes';

import SignIn from './index';

describe('Signin', () => {
  render(<SignIn />);

  // Mock useNavigate and useSignIn hooks
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...(actual as object),
      useNavigate: vi.fn(),
    };
  });

  vi.mock('services/hooks/auth', () => ({
    useSignIn: vi.fn(() => ({
      mutate: vi.fn(),
      isLoading: false,
    })),
  }));

  test('Signin page should render heading', () => {
    const loginHeading = screen.getByRole('heading', {
      name: /login/i,
    });

    expect(loginHeading).toBeInTheDocument();
  });

  test('Signin page should render input element', () => {
    waitFor(() => {
      const emailInput = screen.getByPlaceholderText(/enter your email id here\.\.\./i);
      const passwordInput = screen.getByPlaceholderText(/enter your password here\.\.\./i);

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  test('submitting form with valid data triggers login and navigation', async () => {
    waitFor(async () => {
      const navigate = useNavigate();
      const mockMutate = jest.fn().mockResolvedValue({});

      // Fill form with valid data
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

      expect(mockMutate).toHaveBeenCalledWith({
        email: 'valid@email.com',
        password: 'StrongP@ss123',
        deviceId: '',
        deviceType: '',
        fcmToken: '',
        userType: 'VOLUNTEER',
      });
      await Promise.resolve(); // Wait for async operations

      expect(navigate).toHaveBeenCalledWith(ROUTES.projectManagement);
    });
  });

  test('submitting form with invalid email displays error', () => {
    waitFor(async () => {
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

      // Check for generic email validation error
      expect(screen.getByText('Please enter valid email')).toBeInTheDocument();
    });
  });

  test('submitting form with invalid password displays error', () => {
    waitFor(async () => {
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'weakPassword' } });
      fireEvent.click(submitButton);

      // Check for specific password validation error
      expect(screen.getByText(/Password must be/i)).toBeInTheDocument();
    });
  });
});
