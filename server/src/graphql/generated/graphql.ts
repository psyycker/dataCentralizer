export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  login: AuthenticateResponse;
  test: Scalars['String'];
  getOrganisations: GetOrganisationsResult;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register: AuthenticateResponse;
  createOrganisation: OrganisationCreationResult;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateOrganisationArgs = {
  name: Scalars['String'];
};

export type AuthenticateResponse = {
  __typename?: 'AuthenticateResponse';
  token: Scalars['String'];
};

export type OrganisationCreationResult = {
  __typename?: 'OrganisationCreationResult';
  id: Scalars['String'];
};

export type GetOrganisationsResult = {
  __typename?: 'GetOrganisationsResult';
  organisations?: Maybe<Array<Scalars['String']>>;
};
