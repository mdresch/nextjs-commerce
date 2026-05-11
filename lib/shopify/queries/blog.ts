import imageFragment from "../fragments/image";
import seoFragment from "../fragments/seo";

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!) {
    blogByHandle(handle: $handle) {
      id
      title
      handle
      seo {
        ...seo
      }
      articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            id
            title
            handle
            excerpt
            excerptHtml
            content(truncateAt: 320)
            publishedAt
            author {
              name
            }
            image {
              ...image
            }
          }
        }
      }
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export const getBlogArticleQuery = /* GraphQL */ `
  query getBlogArticle($blog: String!, $article: String!) {
    blogByHandle(handle: $blog) {
      title
      handle
      articleByHandle(handle: $article) {
        title
        handle
        contentHtml
        excerpt
        excerptHtml
        publishedAt
        author {
          name
        }
        image {
          ...image
        }
        seo {
          ...seo
        }
      }
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export const getBlogsSitemapQuery = /* GraphQL */ `
  query getBlogsSitemap {
    blogs(first: 25) {
      edges {
        node {
          handle
          articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                handle
                publishedAt
              }
            }
          }
        }
      }
    }
  }
`;
