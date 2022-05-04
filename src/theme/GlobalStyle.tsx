import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    }

    html {
    font-size: 62.5%;
    }

    body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #282c34;
    min-height: 100vh;

    font-size: 1.6rem;
    color: white;
    }
`;

export default GlobalStyle;
