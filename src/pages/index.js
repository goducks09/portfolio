import React from "react";
import { graphql } from 'gatsby';
import Home from "./home";

//query data to send to the Home page
const IndexPage = ({ data }) => <Home data={data} />;
export default IndexPage

export const query = graphql`
    query {
        githubData {
            data {
                user {
                    pinnedItems {
                        nodes {
                            description
                            name
                            openGraphImageUrl
                            url
                        }
                    }
                }
            }
        }
    }
    `
    ;