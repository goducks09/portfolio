import React from "react";
import { createGlobalStyle } from "styled-components";
import SEO from './seo.js';
import CodeImg from '../images/code-background.jpg';
import "fontsource-nunito/400.css";
import "fontsource-nunito/700.css";

const GlobalStyle = createGlobalStyle`
    html {
      background-color: #141414;
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

    footer {
      background-color: #141414;
      color: white;
      font-style: italic;
      padding: 50px 0 20px;
      text-align: center;
    }

    footer a:visited {
      color: white;
    }

    #about p {
      margin: 0;
      padding: 1.5rem 10%;
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
      margin: -2.5rem auto 0;
      width: 75%;
    }

    #error {
      text-align: center;
    }

    @media (max-width: 1023px) {
      .hero-header {
        margin: -2rem auto 0;
      }
    }

    @media (max-width: 720px) {
      .hero-header {
        margin: -1.75rem auto 0;
      }
    }

    @media (max-width: 650px) {
      #principle-list {
        flex-direction: column;
        margin: 0 10%;
        padding-left: 7%;
        text-align: left;
      }

      #about {
        padding-bottom: 15%;
      }

      .hero {
        height: 35vh;
      }
      
      .hero-header {
        padding: 0;
        width: 90%;
      }
    }
`;

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle/>
      <SEO />
      {children}
    </>
  )
}