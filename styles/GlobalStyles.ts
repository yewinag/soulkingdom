import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
*:not(.fa) {
    font-family: Arial, Helvetica, sans-serif;  
  font-weight: 300;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

ul[role='list'],
ol[role='list'] {
  list-style: none;
}

html:focus-within {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  text-rendering: optimizespeed;
  line-height: 1.5;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
}

img,
picture {
  max-width: 100%;
  display: block;
} 

input,
button,
textarea,
select {
  font: inherit;
} 
`;
