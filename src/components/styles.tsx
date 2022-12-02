import styled from 'styled-components';
import cardIcon from '../assets/images/card.svg';
import infoIcon from '../assets/images/info.svg';
import { InputProps } from './types';

const CheckoutWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 319px;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 0 4px 0.5px #5c5c5c;
`;

const CheckoutHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  h3 {
    font-weight: bold;
    font-size: 20px;
    margin: 0;
  }

  img {
    width: 90px;
    height: 71px;
  }
`;

const CheckoutFooter = styled.div`
  font-size: 12px;
  font-weight: 300;
  color: #5f6974;
  text-align: center;
  margin-top: 8px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 300;
  }
`;

const Input = styled.input<InputProps>`
  padding: 12px;
  font-size: 14px;
  border: ${({ error }) => (error ? '1px solid #e75252' : '1px solid #a7bac5')};
  border-radius: 8px;
  &::placeholder {
    color: #a7bac5;
  }
  background: ${({ icon }) =>
    icon === 'card' && `url(${cardIcon}) no-repeat right`};
  background: ${({ icon }) =>
    icon === 'info' && `url(${infoIcon}) no-repeat right`};
  background-size: ${({ icon }) => icon && '14px'};
  background-position-x: ${({ icon }) => icon && 'calc(100% - 13.33px)'};
  width: ${({ small }) => small && '115.5px'};
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  position: relative;
  justify-content: center;
  display: flex;
  width: 100%;
  padding: 12px 16px;
  background-color: #6e41e2;
  font-weight: 500;
  font-size: 14px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #8e71d6ae;
  }

  img {
    margin-right: 10.67px;
    width: 10.67px;
    height: 14px;
  }
`;

const Error = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  color: #e75252;
  font-size: 11px;
`;

const Success = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  color: #ffffff;
  background-color: #498556;
  border-radius: 0 0 8px 8px;
  animation: fadein 600ms ease-in;

  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

const Spinner = styled.div`
  position: absolute;
  right: 15px;
  bottom: 5px;
  width: 21px;
  height: 21px;
  border: 4px solid rgba(243, 243, 243, 0.541);
  border-radius: 50%;
  border-left-color: transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export {
  Button,
  CheckoutFooter,
  CheckoutForm,
  CheckoutHeader,
  CheckoutWrapper,
  Input,
  FlexRow,
  FormGroup,
  Error,
  Success,
  Spinner,
};
