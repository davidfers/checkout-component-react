import { ChangeEvent, useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.svg';
import lockIcon from '../assets/images/lock.svg';
import { FormEvent } from 'react';
import { handleCardNumber, handleCVV, handleExpDate } from './handlers';
import { validateAll } from './validations';
import * as S from './styles';
import type { FormValues, PaymentInfo } from './types';

const initialData: PaymentInfo = {
  name: {
    value: '',
    error: false,
    errorMessage: 'Name cannot be empty',
  },
  cardNumber: {
    value: '',
    error: false,
    errorMessage: 'Card number must have 16 digits',
  },
  expDate: {
    value: '',
    error: false,
    errorMessage: 'Invalid expiration date',
  },
  cvv: {
    value: '',
    error: false,
    errorMessage: 'Invalid CVV',
  },
  zipCode: {
    value: '',
    error: false,
    errorMessage: 'Zip Code cannot be empty',
  },
};

function Checkout({
  onSubmit,
}: {
  onSubmit: (formValues: FormValues) => Promise<unknown>;
}) {
  const [paymentInfo, setPaymentInfo] = useState(initialData);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const expDateInputRef = useRef<HTMLInputElement>(null);
  const cvvInputRef = useRef<HTMLInputElement>(null);
  const zipCodeInputRef = useRef<HTMLInputElement>(null);
  // Validate each onchange when tried submited
  const triedSubmitRef = useRef(false);
  const {
    name: { value: nameValue },
    cardNumber: { value: cardValue },
    expDate: { value: expDateValue },
    cvv: { value: cvvValue },
    zipCode: { value: zipCodeValue },
  } = paymentInfo;

  useEffect(() => {
    if (triedSubmitRef.current) {
      validateAll(paymentInfo, setPaymentInfo);
    }
  }, [cardValue, nameValue, expDateValue, zipCodeValue, cvvValue]);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setPaymentInfo(initialData);
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  }, [isSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setPaymentInfo({
          ...paymentInfo,
          name: { ...paymentInfo.name, value: e.target.value },
        });
        break;
      case 'cardNumber':
        handleCardNumber(
          e.target.value,
          paymentInfo,
          setPaymentInfo,
          expDateInputRef
        );
        break;
      case 'expDate':
        handleExpDate(e.target.value, paymentInfo, setPaymentInfo, cvvInputRef);
        break;
      case 'cvv':
        handleCVV(e.target.value, paymentInfo, setPaymentInfo, zipCodeInputRef);
        break;
      case 'zipCode':
        setPaymentInfo({
          ...paymentInfo,
          zipCode: { ...paymentInfo.zipCode, value: e.target.value },
        });
        break;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    triedSubmitRef.current = true;
    if (validateAll(paymentInfo, setPaymentInfo)) {
      setIsLoading(true);
      triedSubmitRef.current = false;
      await onSubmit({
        name: nameValue,
        cardNumber: cardValue,
        expDate: expDateValue,
        cvv: cvvValue,
        zipCode: zipCodeValue,
      });
      setIsLoading(false);
      setIsSuccess(true);
    }
  };

  return (
    <S.CheckoutWrapper>
      <S.CheckoutHeader>
        <img src={logo} alt='company' />
        <h3>Payment info</h3>
      </S.CheckoutHeader>
      <S.CheckoutForm onSubmit={(e) => handleSubmit(e)}>
        <S.FormGroup>
          <label htmlFor='name'>Full name</label>
          <S.Input
            id='name'
            type='text'
            name='name'
            placeholder='Your Name'
            value={paymentInfo.name.value}
            onChange={handleChange}
            aria-errormessage='name-error'
            aria-invalid={paymentInfo.name.error}
            error={paymentInfo.name.error}
            ref={nameInputRef}
          />
          {paymentInfo.name.error && (
            <S.Error id='name-error'>{paymentInfo.name.errorMessage}</S.Error>
          )}
        </S.FormGroup>
        <S.FormGroup>
          <label htmlFor='cardNumber'>Card Number</label>
          <S.Input
            id='cardNumber'
            type='text'
            name='cardNumber'
            placeholder='1234 1234 1234 1234'
            icon='card'
            value={paymentInfo.cardNumber.value}
            onChange={handleChange}
            aria-errormessage='cardNumber-error'
            aria-invalid={paymentInfo.cardNumber.error}
            error={paymentInfo.cardNumber.error}
          />
          {paymentInfo.cardNumber.error && (
            <S.Error id='cardNumber-error'>
              {paymentInfo.cardNumber.errorMessage}
            </S.Error>
          )}
        </S.FormGroup>
        <S.FlexRow>
          <S.FormGroup>
            <label htmlFor='expDate'>Expiration</label>
            <S.Input
              id='expDate'
              type='text'
              name='expDate'
              placeholder='MM/YY'
              value={paymentInfo.expDate.value}
              onChange={handleChange}
              aria-errormessage='expDate-error'
              aria-invalid={paymentInfo.expDate.error}
              error={paymentInfo.expDate.error}
              small
              ref={expDateInputRef}
            />
            {paymentInfo.expDate.error && (
              <S.Error id='expDate-error'>
                {paymentInfo.expDate.errorMessage}
              </S.Error>
            )}
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor='cvv'>CVV</label>
            <S.Input
              id='cvv'
              type='text'
              name='cvv'
              placeholder='···'
              icon='info'
              value={paymentInfo.cvv.value}
              onChange={handleChange}
              aria-errormessage='cvv-error'
              aria-invalid={paymentInfo.cvv.error}
              error={paymentInfo.cvv.error}
              small
              ref={cvvInputRef}
            />
            {paymentInfo.cvv.error && (
              <S.Error id='cvv-error'>{paymentInfo.cvv.errorMessage}</S.Error>
            )}
          </S.FormGroup>
        </S.FlexRow>
        <S.FormGroup>
          <label htmlFor='zipCode'>Zip Code</label>
          <S.Input
            id='zipCode'
            type='text'
            name='zipCode'
            placeholder='Your Zip'
            value={paymentInfo.zipCode.value}
            onChange={handleChange}
            aria-errormessage='zipCode-error'
            aria-invalid={paymentInfo.zipCode.error}
            error={paymentInfo.zipCode.error}
            ref={zipCodeInputRef}
          />
          {paymentInfo.zipCode.error && (
            <S.Error id='zipCode-error'>
              {paymentInfo.zipCode.errorMessage}
            </S.Error>
          )}
        </S.FormGroup>
        <div>
          {isSuccess && <S.Success>Submitted!</S.Success>}
          <S.Button disabled={isLoading}>
            <img src={lockIcon} alt='lock' />
            <span>Confirm Payment</span>
            {isLoading && <S.Spinner />}
          </S.Button>
          <S.CheckoutFooter>
            You verify that this info is correct
          </S.CheckoutFooter>
        </div>
      </S.CheckoutForm>
    </S.CheckoutWrapper>
  );
}

export default Checkout;
