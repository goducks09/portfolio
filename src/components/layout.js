import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
    }

    body {
        color: white;
        margin: 0;
    }

    ul {
      padding: 0;
    }
`;

export default function Layout({ children }) {
    return (
      <>
        <GlobalStyle/>
        {children}
      </>
    )
  }