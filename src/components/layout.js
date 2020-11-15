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

    a {
      text-decoration: none;
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

    @media (max-width: 650px) {
      #principle-list {
        flex-direction: column;
        margin: 0 10%;
        padding-left: 7%;
        text-align: left;
      }

      .hero {
        height: 35vh;
      }
      
      .hero-header {
        padding: 0;
        width: 90%;
      }
    }

    @media (max-width: 493px) {
      .hero-header {
        margin: -3.25rem auto 0;
      }
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