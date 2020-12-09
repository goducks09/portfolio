/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

 //make .env file available
require("dotenv").config({
  path: `.env`
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
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-github-api`,
      options: {
        // token: required by the GitHub API
        token: process.env.GITHUB_TOKEN,
  
        // GraphQLquery: defaults to a search query
        graphQLQuery: `
        query {
          user(login:"goducks09") {
            pinnedItems(first:6) {
              nodes {
                ... on Repository {
                  description
                  name
                  openGraphImageUrl
                  readme: object(expression: "master:README.md") {
                    ... on Blob {
                      text
                    }
                  }
                  url
                  repositoryTopics(first: 5) {
                    nodes {
                        topic {
                          name
                        }
                    }
                  }
                }
              }
            }
          }
        }
        `
      }
    }
  ]
} 