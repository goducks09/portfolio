import React from "react";
import {graphql} from 'gatsby';
import Home from "./home";

//query data to send to the Home page
export default ({ data }) => <Home data={data} />;

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
                        }
                    }
                }
            }
        }
    }
    `
;