import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { vi } from 'vitest';
import Checkout from './Checkout';

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
      expect(onSubmit).toHaveBeenCalled();
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
