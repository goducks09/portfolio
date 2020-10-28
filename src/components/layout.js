import React from "react";
import { createGlobalStyle } from "styled-components";
import CodeImg from '../images/code-background.jpg';
import "fontsource-nunito/400.css";
import "fontsource-nunito/700.css";

const GlobalStyle = createGlobalStyle`
    html {
        font-family: 'Nunito';
        font-size: 16px;
    }

    body {
        color: white;
        margin: 0;
    }

    ul {
      padding: 0;
    }

    #about p {
      padding: 0 10%;
      text-align: left;
    }

    #principle-list {
      display: flex;
      justify-content: space-around;
      margin: 0 0 10% 0;
    }

    .hero {
      background: no-repeat center/cover url(${CodeImg});
      height: 55vh;
    }

    .hero-header {
      background: black;
      margin: -2rem auto 0;
      width: 75%;
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