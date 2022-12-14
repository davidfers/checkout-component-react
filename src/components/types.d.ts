interface FormField {
  value: string;
  error: boolean,
  errorMessage: string,
}

export interface PaymentInfo {
  name: FormField;
  cardNumber: FormField;
  expDate: FormField;
  cvv: FormField;
  zipCode: FormField;
}

export interface FormValues {
  name: string,
  cardNumber: string,
  expDate: string,
  cvv: string,
  zipCode: string,
}

export interface InputProps {
  readonly icon?: 'card' | 'info';
  readonly small?: boolean;
  readonly error?: boolean;
}

