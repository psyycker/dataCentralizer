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
  getProjectsForUser: GetProjectsResponse;
  getProjects: GetProjectsResponse;
  getProject: Project;
  permissions: ProjectPermissions;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryGetProjectsArgs = {
  organisationId: Scalars['ID'];
};


export type QueryGetProjectArgs = {
  project: Scalars['ID'];
};


export type QueryPermissionsArgs = {
  projectId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  register: AuthenticateResponse;
  createOrganisation: OrganisationCreationResult;
  createProject: Project;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateOrganisationArgs = {
  name: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  name: Scalars['String'];
  organisation: Scalars['ID'];
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

export type GetProjectsResponse = {
  __typename?: 'GetProjectsResponse';
  projects?: Maybe<Array<Project>>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  owner: Scalars['ID'];
  permissions: ProjectPermissions;
  name: Scalars['String'];
};

export type ProjectPermissions = {
  __typename?: 'ProjectPermissions';
  projectId: Scalars['ID'];
  userId: Scalars['ID'];
  canEdit: Scalars['Boolean'];
  canRemoveFiles: Scalars['Boolean'];
  canMoveFiles: Scalars['Boolean'];
  canCreateFiles: Scalars['Boolean'];
  canAddUsersToProject: Scalars['Boolean'];
  canRemoveUsersToProject: Scalars['Boolean'];
};
