import { gql, GraphQLClient, request } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(endpoint, query);

  return result.postsConnection.edges;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(endpoint, query, { slug });

  return result.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(endpoint, query);

  return result.posts;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(endpoint, query, { slug, categories });

  return result.posts;
};


export async function getCategories() {
  const query = gql`
    query GetCategories {
      categories{
        name
        slug
      }
    }
`
  const result = await request(endpoint, query)
  return result.categories
}

export const postData = async (commentObj) => {
  const TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODE4ODU0NzMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsZ2trb2wxcTM4NG4wMXQ1ODZnaThpNDcvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjhhZGVkZjM4LTYzNDktNGFmZC04ODhiLWE3MmQyZDk1MmVkMiIsImp0aSI6ImNsZ25iNnA2azVtbDIwMXQ1MDY3YWVyYzUifQ.Q2Y10AhL5TzCdoT2oLO78TcsIVvGTkc6SsPbQi5Lu4on1mft59jvO-orzOJcEsbdDNFpdvQ_ZuMJVgV3-Axyew1X_2Qe9kz8mSr5uuLwIPX-nfw-Qlg8CBhNFnYb1a0fjlmkh8sIVBZK4zoDY7BvPK6zjp0G1Z42mphxz8Ph2WkyP8YCviyrKJAy5NecPV0kmAP44tSj93gKGFduRg9CvEJeLKW-qwMNW8pDZ3iSZs6UIjBncI8ipS2kmNAk4_wDx6Jp5ifI25ujW_7cqqjKj5XkYq-p-NXXGyGEpbUxQOBXHxoJoGPFgJ3KAziFpJGl33_4uwOg3yPagWR4hrjRsWs1ccD_0MPqAQ5XhskwWsaxzrSAPPXYV-C5VotbVunQFqcqkEHEznP3rnRTLo-Nv4Y7RRhMzfW3TKUbBGGuWtjLmAaCq620k_Mxy0Z4FaY11LlULjmFzjC40vRJZAyCV1jWphW3kcu4GB5mNypn3Dom1Cs-1OYoxixBb5d00rcnoJOGwwYgBKpv5hP550x2TTp9FUcotoIoYE83JLxgN5TLzukP9VscfXfMOAEZz45A0KA0wJ65lC1hkMRlTlK7rCyJyKuk2awyiQYbZRi-K4SWVJBxPESaLXT1wfbAFzEfSKSoxcEwvv_qORdlSF59B7RcydIlZ83CFpETivU45BI'
  const endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
  const headers = {
    authorization: `Bearer ${TOKEN}`,
  };
  const graphQLClient = new GraphQLClient(endpoint, { headers });
  const mutation = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
  }
`;
  try {
    const variables = {
      name: commentObj.name,
      email: commentObj.email,
      comment: commentObj.comment,
      slug: commentObj.slug,
    };
    const result = await graphQLClient.request(mutation, variables);
    return result
  } catch (error) {
    console.error(error);
  }
}

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(endpoint, query, { slug });

  return result.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(endpoint, query);

  return result.posts;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(endpoint, query, { slug });

  return result.postsConnection.edges;
};