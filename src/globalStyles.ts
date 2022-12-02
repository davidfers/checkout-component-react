import { createGlobalStyle } from "styled-components";
import RubikBlack from "./assets/fonts/Rubik-Black.ttf";
import RubikLight from "./assets/fonts/Rubik-Light.ttf";
import RubikMedium from "./assets/fonts/Rubik-Medium.ttf";

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Rubik';
  src: url(${RubikMedium});
  font-weight: 500;
}

@font-face {
  font-family: 'Rubik';
  src: url(${RubikBlack});
  font-weight: bold;
  font-display: swap;
}

@font-face {
  font-family: 'Rubik';
  src: url(${RubikLight});
  font-weight: 300;
  font-display: swap;
}

body{
  font-family: 'Rubik', sans-serif;
  margin: 0;
}
`;




export default GlobalStyles;