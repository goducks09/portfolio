import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, description, image }) => {
  const { site } = useStaticQuery(query);
  const {
    defaultTitle,
    defaultDescription,
    defaultImage,
    siteUrl
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`
  };

  return (
    <>
      <title>{seo.title}</title>
      <html lang="en" className="scroll-smooth" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Mono:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </>
  );
};

export default Seo;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        defaultImage: image
        siteUrl: url
      }
    }
  }
`;