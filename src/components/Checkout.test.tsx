import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';
import Checkout from './Checkout';

const user = userEvent.setup();

describe('Checkout', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<Checkout onSubmit={onSubmit} />);
  });

  test('onSubmit() when all fields pass validation', async () => {
    await user.type(getNameInput(), 'John Doe');
    await user.type(getCardInput(), '1234 5678 9012 3456');
    await user.type(getExpDateInput(), '12/34');
    await user.type(getCvvInput(), '123');
    await user.type(getZipCodeInput(), '12345');
    clickConfirmButton();
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      cardNumber: '1234 5678 9012 3456',
      expDate: '12/34',
      cvv: '123',
      zipCode: '12345',
    });
  });
  test('Every field has an error message when empty', async () => {
    clickConfirmButton();
    await waitFor(() => {
      expect(getNameInput()).toHaveErrorMessage('Name cannot be empty');
      expect(getCardInput()).toHaveErrorMessage(
        'Card number must have 16 digits'
      );
      expect(getExpDateInput()).toHaveErrorMessage('Invalid expiration date');
      expect(getCvvInput()).toHaveErrorMessage('Invalid CVV');
      expect(getZipCodeInput()).toHaveErrorMessage('Zip Code cannot be empty');
    });
  });
  test('If an invalid character is typed should not be rendered', async () => {
    await user.type(getCardInput(), '1234 5678 9p12 3456');
    expect(getCardInput()).toHaveValue('1234 5678 9123 456');

    await user.type(getExpDateInput(), '1t34');
    expect(getExpDateInput()).toHaveValue('1');

    await user.type(getCvvInput(), '1a3');
    expect(getCvvInput()).toHaveValue('13');
  });
  test('If confirmed with errors, validation will happen with every typing', async () => {
    await user.type(getCardInput(), '1234 5678 9012 345');
    clickConfirmButton();
    await waitFor(() => {
      expect(getCardInput()).toHaveErrorMessage(
        'Card number must have 16 digits'
      );
    });
    await user.type(getCardInput(), '6');
    await waitFor(() => {
      expect(getCardInput()).not.toHaveErrorMessage(
        'Card number must have 16 digits'
      );
    });
  });
  test('Submitted message should appear and disappear after 5s', async () => {
    //To be able to make use of fake timers, delay must be set to null
    const user = userEvent.setup({ delay: null });
    vi.useFakeTimers();
    await user.type(getNameInput(), 'John Doe');
    await user.type(getCardInput(), '1234 5678 9012 3456');
    await user.type(getExpDateInput(), '12/34');
    await user.type(getCvvInput(), '123');
    await user.type(getZipCodeInput(), '12345');
    await user.click(screen.getByRole('button', { name: /confirm payment/i }));
    await waitFor(
      () => expect(screen.queryByText(/submitted!/i)).toBeInTheDocument(),
      {
        timeout: 1000,
        onTimeout: () => new Error('No Submitted message appeared'),
      }
    );
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByText(/submitted!/i)).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});

function getNameInput() {
  return screen.getByRole('textbox', { name: /full name/i });
}

function getCardInput() {
  return screen.getByRole('textbox', { name: /card number/i });
}

function getExpDateInput() {
  return screen.getByRole('textbox', { name: /expiration/i });
}

function getCvvInput() {
  return screen.getByRole('textbox', { name: /cvv/i });
}

function getZipCodeInput() {
  return screen.getByRole('textbox', { name: /zip code/i });
}

function clickConfirmButton() {
  user.click(screen.getByRole('button', { name: /confirm payment/i }));
}
