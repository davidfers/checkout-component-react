import { SetStateAction } from 'react';
import { PaymentInfo } from './types';


export const validateAll = (paymentInfo: PaymentInfo, setPaymentInfo: (value: SetStateAction<PaymentInfo>) => void) => {
  const nameError = !(paymentInfo.name.value.length > 0);
  const cardError = !(paymentInfo.cardNumber.value.replace(/\s/g, '').length === 16);
  const expDateError = !(paymentInfo.expDate.value.replace(/\//, '').length === 4);
  const zipCodeError = !(paymentInfo.zipCode.value.length > 0);
  const CVVError = !(paymentInfo.cvv.value.length === 3);

  setPaymentInfo(prev => ({
    ...prev,
    name: { ...prev.name, error: nameError },
    cardNumber: { ...prev.cardNumber, error: cardError },
    expDate: { ...prev.expDate, error: expDateError },
    zipCode: { ...prev.zipCode, error: zipCodeError },
    cvv: { ...prev.cvv, error: CVVError },

  }))
  return !nameError && !cardError && !expDateError && !zipCodeError && !CVVError;
}
