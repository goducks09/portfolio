import React from 'react';
import Layout from '../components/layout';
import { Link } from "gatsby";
import Seo from '../components/Seo';

export default function ErrorPage() {
    return (
        <Layout>
            <div id='error'>
                <h1>Oh no! You've found the dreaded 404 page.</h1>
                <p>*womp womp womp*</p>
                <Link to='/'>
                    <p>Try going back home and navigating again.</p>
                </Link>
            </div>
        </Layout>
    );
}

export const Head = () => <Seo />;