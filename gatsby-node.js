const fs = require('fs');
const envPath = `.env.${process.env.NODE_ENV}`;
require("dotenv").config({
  path: fs.existsSync(envPath) ? envPath : '.env',
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type GithubData implements Node {
      data: GithubDataData
    }
    type GithubDataData {
      user: GithubDataUser
    }
    type GithubDataUser {
      pinnedItems: GithubDataPinnedItems
    }
    type GithubDataPinnedItems {
      nodes: [GithubDataRepository]
    }
    type GithubDataRepository {
      description: String
      name: String
      openGraphImageUrl: String
      url: String
      readme: GithubDataReadme
      repositoryTopics: GithubDataRepositoryTopics
    }
    type GithubDataReadme {
      text: String
    }
    type GithubDataRepositoryTopics {
      nodes: [GithubDataTopicNode]
    }
    type GithubDataTopicNode {
      topic: GithubDataTopic
    }
    type GithubDataTopic {
      name: String
    }
  `);
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

  const nodes = result.data?.githubData?.data?.user?.pinnedItems?.nodes;
  if (!nodes || nodes.length === 0) {
    console.warn("No GitHub pinned items found. Skipping project page creation.");
    return;
  }

  nodes.forEach(node => {
    let text = sanitizeHtml(node.readme?.text || '');
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