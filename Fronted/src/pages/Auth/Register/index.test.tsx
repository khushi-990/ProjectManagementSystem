import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { render } from 'test/utils';
import { describe, vi } from 'vitest';

import { ROUTES } from 'utils/constants/routes';

import Register from '.';

describe('Register', () => {
  render(<Register />);

  // Mock useNavigate and useSignIn hooks
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...(actual as object),
      useNavigate: vi.fn(),
    };
  });

  vi.mock('services/hooks/auth', () => ({
    useRegister: vi.fn(() => ({
      mutate: vi.fn(),
      isLoading: false,
    })),
  }));

  test('Signin page should render heading', () => {
    const registerHeading = screen.getByRole('heading', {
      name: /register/i,
    });

    expect(registerHeading).toBeInTheDocument();
  });

  test('Register page should render input element', () => {
    waitFor(() => {
      const firstNameInput = screen.getByPlaceholderText(/enter your first name\.\.\./i);
      const lastNameInput = screen.getByPlaceholderText(/enter your last name\.\.\./i);
      const emailInput = screen.getByPlaceholderText(/enter your email id\.\.\./i);
      const passwordInput = screen.getByPlaceholderText(/enter your password\.\.\./i);

      expect(firstNameInput).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });
  });

  test('submitting form with valid data triggers login and navigation', async () => {
    waitFor(async () => {
      const navigate = useNavigate();
      const mockMutate = jest.fn().mockResolvedValue({});

      // Fill form with valid data
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(firstNameInput, { target: { value: 'john' } });
      fireEvent.change(lastNameInput, { target: { value: 'doe' } });
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

      expect(mockMutate).toHaveBeenCalledWith({
        firstName: 'john',
        lastName: 'doe',
        email: 'valid@email.com',
        password: 'StrongP@ss123',
      });
      await Promise.resolve(); // Wait for async operations

      expect(navigate).toHaveBeenCalledWith(ROUTES.projectManagement);
    });
  });

  test('submitting form with invalid email displays error', () => {
    waitFor(async () => {
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(firstNameInput, { target: { value: 'john' } });
      fireEvent.change(lastNameInput, { target: { value: 'doe' } });
      fireEvent.change(emailInput, { target: { value: 'invalidEmail' } });
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

      // Check for generic email validation error
      expect(screen.getByText('Please enter valid email')).toBeInTheDocument();
    });
  });

  test('submitting form with invalid password displays error', () => {
    waitFor(async () => {
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(firstNameInput, { target: { value: 'john' } });
      fireEvent.change(lastNameInput, { target: { value: 'doe' } });
      fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
      fireEvent.change(passwordInput, { target: { value: 'weakPassword' } });
      fireEvent.click(submitButton);

      // Check for specific password validation error
      expect(screen.getByText(/Password must be/i)).toBeInTheDocument();
    });
  });

  test('submitting form with invalid first name displays error', () => {
    waitFor(async () => {
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(firstNameInput, { target: { value: '' } });
      fireEvent.change(lastNameInput, { target: { value: 'doe' } });
      fireEvent.change(emailInput, { target: { value: 'email@yopmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

      // Check for generic first name validation error
      expect(screen.getByText('Please enter first name')).toBeInTheDocument();
    });
  });

  test('submitting form with invalid first name displays error', () => {
    waitFor(async () => {
      const firstNameInput = screen.getByTestId('firstName');
      const lastNameInput = screen.getByTestId('lastName');
      const emailInput = screen.getByTestId('email');
      const passwordInput = screen.getByTestId('password');
      const submitButton = screen.getByRole('button', { name: /Login/i });

      fireEvent.change(firstNameInput, { target: { value: 'john' } });
      fireEvent.change(lastNameInput, { target: { value: '' } });
      fireEvent.change(emailInput, { target: { value: 'email@yopmail.com' } });
      fireEvent.change(passwordInput, { target: { value: 'StrongP@ss123' } });
      fireEvent.click(submitButton);

      // Check for generic first name validation error
      expect(screen.getByText('Please enter last name')).toBeInTheDocument();
    });
  });
});
