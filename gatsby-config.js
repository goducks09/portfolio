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
  plugins: [
    `gatsby-plugin-styled-components`,
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