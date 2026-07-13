# Developing A Portfolio Website

## Architecture & Design Philosophy

The goal for this portfolio was to build a content-driven static site that automatically incorporates live GitHub repository data at build time. I like to try out different tools to see what benefit they might provide. Having previously focused heavily on standard React workflows, I decided to use **Gatsby** after seeing it recommended in a few places.

Before writing any code, I focused on the layout design by building interactive prototypes in **Webflow**. This allowed me to iterate rapidly on layout configurations, responsive breakpoints, and visual hierarchy without worrying about boilerplate setup. Once the design UI/UX patterns were finalized, I mapped the visual components directly into structured React components.

## Design Implementation & Styling Architecture
I decided to use styled-components, embracing a component-driven architectural pattern. This allowed me to encapsulate both logic and styling within a single file, making future UI/UX updates simple and intuitive.

**Dynamic Styling & Theming:** I utilized a combination of CSS Custom Properties, React state, styled-components props, and HTML data-attributes to manage dynamic styling while also centralizing shared values in a global theme file.

**Critical CSS & SSR Integration:** I integrated the gatsby-plugin-styled-components plugin to ensure that all critical styles were server-side rendered (SSR) and injected directly into the HTML header at build time, resulting in instantaneous visual rendering for users.

## The Technical Challenge: Integrating the GitHub GraphQL API

While bootstrapping the Gatsby environment was straightforward, the primary challenge was handling the dynamic data at build time. To highlight my active repositories and commit history, I integrated the **GitHub GraphQL API**. Because I had not previously worked with GraphQL, this introduced a steep but rewarding learning curve.

### Roadblocks & Mitigations

* **Schema Navigation:** Understanding how to construct tightly scoped queries using edges and nodes took some trial and error. I utilized GitHub’s GraphiQL Explorer in addition to manual debugging to isolate the exact repository metadata needed.
* **Build-Time Data Ingestion:** Rather than relying on third-party source plugins, I authored a custom integration using Gatsby's `sourceNodes` lifecycle API. During the build phase, the site fetches the pinned repositories using the GitHub GraphQL API. The data is then used to create pages for each repository at build time.

## Key Takeaways

This project successfully demonstrated the efficiency of Static Site Generation for developer portfolios. By decoupling the frontend from a traditional server and pre-rendering the HTML, the site achieves fast load times and optimal SEO performance. It also gave me exposure to the Gatsby framework and GitHub GraphQL, expanding my full-stack toolset.
