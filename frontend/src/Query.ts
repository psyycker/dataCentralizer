import gql from 'graphql-tag';

export const QUERY_TEST = gql`
  query Login {
    login
  }
`;

export const REGISTER_TEST = gql`
  mutation Register {
    register
  }

`
