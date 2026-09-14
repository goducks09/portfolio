/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

//make .env file available
const fs = require('fs');
const envPath = `.env.${process.env.NODE_ENV}`;
require("dotenv").config({
  path: fs.existsSync(envPath) ? envPath : '.env'
});

module.exports = {
  siteMetadata: {
    title: "Chris' Web Developer Portfolio",
    description:
      "Chris' web developer portfolio showcases his programming skills in React, Javascript, Python, and more",
    image: '/seo-preview.jpg',
    url: 'http://developedbychris.com'
  },
  plugins: [
    `gatsby-plugin-styled-components`,
  ]
} 