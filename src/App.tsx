import styled from 'styled-components';
import Checkout from './components/Checkout';
import { FormValues } from './components/types';
import GlobalStyles from './globalStyles';

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  return (
    <Container>
      <GlobalStyles />
      <Checkout onSubmit={onSubmit} />
    </Container>
  );
}

function onSubmit(formValues: FormValues) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(formValues);
      resolve('OK');
    }, 1000);
  });
}

export default App;
