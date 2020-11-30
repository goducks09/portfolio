import React from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import Layout from '../components/layout';

export default function ErrorPage() {
    return (
        <Layout>
            <div id='error'>
                <h1>Oh no! You've found the dreaded 404 page.</h1>
                <p>*womp womp womp*</p>
                <AniLink cover to='/' bg='linear-gradient(to right,#8ab4ff,#e492ff)'>
                    <p>Try going back home and navigating again.</p>
                </AniLink>
            </div>
        </Layout>
    );
}