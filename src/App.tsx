import styled from 'styled-components';
import Checkout from './components/Checkout';
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
      <Checkout />
    </Container>
  );
}

export default App;
