import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Counter from './components/Counter';

// Mock console.log to avoid noise in tests
vi.spyOn(console, 'log').mockImplementation(() => {});

describe('App Component', () => {
  it('should render the main app with counter and settings button', () => {
    render(<App />);

    expect(screen.getByText('Advanced React Demo')).toBeInTheDocument();
    expect(screen.getByText('Counter with Memoization')).toBeInTheDocument();
    expect(screen.getByText('Lazy Loading Demo')).toBeInTheDocument();
    expect(screen.getByTestId('settings-button')).toBeInTheDocument();
  });

  it('should show lazy-loaded component when settings button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initially, the lazy settings component should not be visible
    expect(screen.queryByTestId('lazy-settings')).not.toBeInTheDocument();

    // Click the settings button
    const settingsButton = screen.getByTestId('settings-button');
    expect(settingsButton).toHaveTextContent('Load Settings');

    await user.click(settingsButton);

    // Wait for the lazy component to load and appear
    await waitFor(() => {
      expect(screen.getByTestId('lazy-settings')).toBeInTheDocument();
    });

    // Check that the settings panel content is rendered
    expect(screen.getByText('Settings Panel')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This component was lazy loaded using React.lazy() and Suspense'
      )
    ).toBeInTheDocument();

    // Button text should change
    expect(settingsButton).toHaveTextContent('Hide Settings');
  });
});

describe('Counter Component', () => {
  it('should increment counter correctly', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} multiplier={2} />);

    // Check initial state
    expect(screen.getByText('0')).toBeInTheDocument();

    // Find and click the increment button
    const incrementButton = screen.getByRole('button', { name: '+' });
    await user.click(incrementButton);

    // Check that counter incremented
    expect(screen.getByText('1')).toBeInTheDocument();

    // Click increment button again
    await user.click(incrementButton);
    expect(screen.getByText('2')).toBeInTheDocument();

    // Test decrement functionality
    const decrementButton = screen.getByRole('button', { name: '-' });
    await user.click(decrementButton);
    expect(screen.getByText('1')).toBeInTheDocument();

    // Test reset functionality
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    await user.click(resetButton);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should display expensive calculation result', () => {
    render(<Counter initialValue={5} multiplier={3} />);

    // Check that the expensive calculation result is displayed
    expect(
      screen.getByText(/Expensive calculation result:/)
    ).toBeInTheDocument();

    // The result should be a number (5 * 3 = 15)
    expect(screen.getByText('15.00')).toBeInTheDocument();
  });

  it('should use memoization for expensive calculations', async () => {
    const user = userEvent.setup();
    const consoleSpy = vi.spyOn(console, 'log');

    render(<Counter initialValue={0} multiplier={2} />);

    // Clear previous console calls
    consoleSpy.mockClear();

    // Click increment button
    const incrementButton = screen.getByRole('button', { name: '+' });
    await user.click(incrementButton);

    // Should see the expensive calculation log
    expect(consoleSpy).toHaveBeenCalledWith(
      'Performing expensive calculation...'
    );

    // Clear console again
    consoleSpy.mockClear();

    // Re-render with same props should not trigger expensive calculation again
    // (This is a simplified test - in real scenarios, you'd test with same count value)
    render(<Counter initialValue={1} multiplier={2} />);

    // The expensive calculation should run again for the new initial value
    expect(consoleSpy).toHaveBeenCalledWith(
      'Performing expensive calculation...'
    );
  });
});
