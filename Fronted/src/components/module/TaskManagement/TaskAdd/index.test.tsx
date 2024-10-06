import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { render } from 'test/utils';
import { describe, vi } from 'vitest';

import { ROUTES } from 'utils/constants/routes';

import TaskAdd from '.';

describe('TaskAdd', () => {
  render(<TaskAdd />);

  // Mock useNavigate and useSignIn hooks
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...(actual as object),
      useNavigate: vi.fn(),
    };
  });

  vi.mock('services/hooks/auth', () => ({
    useCreteTask: vi.fn(() => ({
      mutate: vi.fn(),
      isLoading: false,
    })),
  }));

  vi.mock('services/hooks/auth', () => ({
    useUpdateTask: vi.fn(() => ({
      mutate: vi.fn(),
      isLoading: false,
    })),
  }));

  test('Add task page should render heading', () => {
    const registerHeading = screen.getByRole('heading', {
      name: /add task/i,
    });

    expect(registerHeading).toBeInTheDocument();
  });

  test('Add task page should render input element', () => {
    waitFor(() => {
      const titleInput = screen.getByPlaceholderText(/enter task name\.\.\./i);
      const descriptionInput = screen.getByPlaceholderText(/enter your description\.\.\./i);
      const userIdInput = screen.getByPlaceholderText(/assign to\.\.\./i);

      expect(titleInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
      expect(userIdInput).toBeInTheDocument();
    });
  });

  test('submitting form with valid data triggers login and navigation', async () => {
    waitFor(async () => {
      const navigate = useNavigate();
      const mockMutate = jest.fn().mockResolvedValue({});

      // Fill form with valid data
      const nameInput = screen.getByTestId('name');
      const descriptionInput = screen.getByTestId('description');
      const submitButton = screen.getByRole('button', { name: /Add task/i });

      fireEvent.change(nameInput, { target: { value: 'task 1' } });
      fireEvent.change(descriptionInput, { target: { value: 'description 1' } });
      fireEvent.click(submitButton);

      expect(mockMutate).toHaveBeenCalledWith({
        firstName: 'task 1',
        lastName: 'description 1',
      });
      await Promise.resolve(); // Wait for async operations

      expect(navigate).toHaveBeenCalledWith(ROUTES.taskManagement);
    });
  });

  test('submitting form with invalid email displays error', () => {
    waitFor(async () => {
      // Fill form with valid data
      const nameInput = screen.getByTestId('name');
      const descriptionInput = screen.getByTestId('description');
      const submitButton = screen.getByRole('button', { name: /Add task/i });

      fireEvent.change(nameInput, { target: { value: '' } });
      fireEvent.change(descriptionInput, { target: { value: 'description 1' } });
      fireEvent.click(submitButton);

      // Check for generic email validation error
      expect(screen.getByText('Please enter task name')).toBeInTheDocument();
    });
  });

  test('submitting form with invalid password displays error', () => {
    waitFor(async () => {
      // Fill form with valid data
      const nameInput = screen.getByTestId('name');
      const descriptionInput = screen.getByTestId('description');
      const submitButton = screen.getByRole('button', { name: /Add task/i });

      fireEvent.change(nameInput, { target: { value: 'task 1' } });
      fireEvent.change(descriptionInput, { target: { value: '' } });
      fireEvent.click(submitButton);

      // Check for specific password validation error
      expect(screen.getByText(/Please enter description/i)).toBeInTheDocument();
    });
  });
});
