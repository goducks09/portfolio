import React from "react";
import ReactMarkdown from 'react-markdown/with-html';
import Layout from "../components/layout";

export default function Page( context ) {
  console.log(context);
  return (
    <Layout>
      <h1>{context.pageContext.title}</h1>
      <img src={context.pageContext.image}></img>
      <ReactMarkdown source={context.pageContext.overview} escapeHtml={false} />
      <h2>Technologies:</h2>
      <ul>{context.pageContext.technologies.map(technology => <li>{technology.topic.name}</li>)}</ul>
    </Layout>
  );
}