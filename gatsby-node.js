const path = require(`path`);
const sanitizeHtml = require('sanitize-html');

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
        `
    );

    result.data.githubData.data.user.pinnedItems.nodes.forEach( node => {
        let text = sanitizeHtml(node.readme.text);
        createPage({
            path: node.name,
            component: path.resolve(`./src/templates/project-page.js`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                image: node.openGraphImageUrl,
                overview: text,
                technologies: node.repositoryTopics.nodes,
                title: node.description
            }
        });
    });
}