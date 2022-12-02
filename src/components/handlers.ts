import type { RefObject, SetStateAction } from 'react';
import type { PaymentInfo } from './types';

export const handleCardNumber = (
  value: string,
  paymentInfo: PaymentInfo,
  setPaymentInfo: (value: SetStateAction<PaymentInfo>) => void,
  nextInput: RefObject<HTMLInputElement>
) => {

  value = value.replace(/\s/g, '');
  if (
    value && (value.match(/\D$/) ||
      value.length > 16)
  )
    return;
  if (value.length === 16) nextInput.current?.focus();
  let parsedValue = '';
  for (let i = 0; i < value.length; i++) {
    if (i !== 0 && i % 4 === 0) {
      parsedValue += ' ';
    }
    parsedValue += value[i];
  }
  setPaymentInfo({
    ...paymentInfo,
    cardNumber: { ...paymentInfo.cardNumber, value: parsedValue },
  });
};


export const handleExpDate = (
  value: string,
  paymentInfo: PaymentInfo,
  setPaymentInfo: (value: SetStateAction<PaymentInfo>) => void,
  nextInput: RefObject<HTMLInputElement>
) => {
  value = value.replace(/\//, '');
  if (value && !value.match(/^[01]$|^(0[1-9]|1[0-2])$|^(0[1-9]|1[0-2])\d{1,2}$/)
  )
    return;
  if (value.length === 4) nextInput.current?.focus();
  let parsedValue = '';
  for (let i = 0; i < value.length; i++) {
    if (i === 2) {
      parsedValue += '/';
    }
    parsedValue += value[i];
  }
  setPaymentInfo({
    ...paymentInfo,
    expDate: { ...paymentInfo.expDate, value: parsedValue },
  });
};


export const handleCVV = (
  value: string,
  paymentInfo: PaymentInfo,
  setPaymentInfo: (value: SetStateAction<PaymentInfo>) => void,
  nextInput: RefObject<HTMLInputElement>
) => {
  if (
    value && (value.match(/\D$/) || value.length > 3)
  )
    return;
  if (value.length === 3) nextInput.current?.focus()
  setPaymentInfo({
    ...paymentInfo,
    cvv: { ...paymentInfo.cvv, value },
  });
};
