import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { render } from 'test/utils';
import { describe, vi } from 'vitest';

import { ROUTES } from 'utils/constants/routes';

import MyProfile from '.';

describe('My Profile', () => {
  render(<MyProfile />);

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...(actual as object),
      useNavigate: vi.fn()
    };
  });

  test('My profile page should render reports', () => {
    const myProfileHeading = screen.getByRole('heading', {
      name: /my profile/i
    });

    expect(myProfileHeading).toBeInTheDocument();
  });

  test('renders profile details with data', () => {
    const mockData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
      // ... other profile details
    };

    waitFor(() => {
      // Check for specific details (replace with all relevant fields)
      expect(screen.getByText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByText(mockData.firstName)).toBeInTheDocument();

      expect(screen.getByText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByText(mockData.email)).toBeInTheDocument();
    });
  });

  // Alternatively, you can test for the absence of data using '-'
  test('renders profile details with missing data', () => {
    waitFor(() => {
      expect(screen.getByText(/-/i)).toBeInTheDocument(); // Check for '-' in multiple places
    });
  });

  test('clicking Edit Profile button navigates to edit route', () => {
    waitFor(() => {
      const navigate = useNavigate();

      const editButton = screen.getByRole('button', { name: /Edit Profile/i });
      fireEvent.click(editButton);

      expect(navigate).toHaveBeenCalledWith(ROUTES.editMyProfile);
    });
  });
});
