require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const path = require(`path`);
const sanitizeHtml = require('sanitize-html');

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;
  const githubUsername = 'goducks09'
  const query = `
    query {
      user(login: "${githubUsername}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              description
              name
              openGraphImageUrl
              url
              readme: object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
              repositoryTopics(first: 10) {
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
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const json = await response.json();

  if (!json.data) {
    console.error("GitHub API error:", JSON.stringify(json, null, 2));
    return;
  }

  const { data } = json;

  createNode({
    data,
    id: createNodeId("github-data"),
    parent: null,
    children: [],
    internal: {
      type: "GithubData",
      contentDigest: createContentDigest(data),
    },
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      githubData {
        data {
          user {
            pinnedItems {
              nodes {
                description
                name
                openGraphImageUrl
                readme {
                  text
                }
                url
                repositoryTopics {
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
    }
  `);

  result.data.githubData.data.user.pinnedItems.nodes.forEach(node => {
    let text = sanitizeHtml(node.readme.text);
    createPage({
      path: node.name,
      component: path.resolve(`./src/templates/project-page.js`),
      context: {
        image: node.openGraphImageUrl,
        overview: text,
        technologies: node.repositoryTopics.nodes,
        title: node.description,
        url: node.url
      }
    });
  });
};