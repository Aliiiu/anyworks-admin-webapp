import React, { FC, ReactNode } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    black: '#000000',
    blue: '#55C4F1',
    red: '#EB5656',
    text_01: '#1D2939',
    gray_01: '#d9d9d9',
    gray_02: '#F9FAFB',
    purple: '#7E00C4',
    darkPurple: '#210639',
    text_04: '#828282',
    transparent: 'transparent',
    white: '#ffffff',
    cyan: '#00CCCD',
    mustard: '#FFAD4A',
    ui_01:'#f4f4f4'
  },
  breakpoint: {
    lg: '1024px',
    md: '768px',
    sm: '425px',
  },
}


const GlobalStyle = createGlobalStyle`
html,
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
input,
button {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
body {
  scroll-behavior: smooth;
  background-color: #F2F4F7;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  border: 0;
  background-color: transparent;
}
ul {
  padding: 0;
  margin: 0 0 0 1.1rem;
  list-style-type: disc;
  list-style-position: outside;
}
`;

const Theme: FC<{ children: ReactNode }> = ({ children }) => (
	<ThemeProvider theme={theme}>
		<>
			<GlobalStyle />
			{children}
		</>
	</ThemeProvider>
);

export default Theme;
