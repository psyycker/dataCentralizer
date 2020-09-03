import {IUserSchema} from "../database/user";
import PermissionDenied from "../errors/PermissionDenied";
import Organisation from '../database/organisation';
import OrganisationPermissions from '../database/organisation/permissions'
import OrganisationCreationError from "../errors/organisation/OrganisationCreationError";
import OrganisationPermissionsCreationError from "../errors/organisation/OrganisationPermissionsCreationError";
import {organisationNameExistsForUser, removeOrganisation} from "../database/organisation/helper";
import OrganisationNameExistsForUser from "../errors/organisation/OrganisationNameExistsForUser";
import {getUserPermissions} from "../database/organisation/permissions/helper";

function canCreateOrganisation(user: IUserSchema): void {
  if (user == null) {
    throw new PermissionDenied();
  }
}

function canViewOwnOrganisations(user: IUserSchema): void {
  if (user == null) {
    throw new PermissionDenied();
  }
}

export async function getOrganisations(user: IUserSchema): Promise<string[]> {
  canViewOwnOrganisations(user);
  const permissions = await getUserPermissions(user);
  return permissions.map((permission) => permission.organisation.toString());
}

export function createOrganisation(user: IUserSchema, organisationName: string): Promise<string> {
  canCreateOrganisation(user);
  const organisation = new Organisation({
    name: organisationName,
    owner: user._id
  })
  const organisationPermissions = new OrganisationPermissions({
    organisation: organisation._id,
    user: user._id,
    owner: true,
    canAddAdmins: true,
    canRemoveAdmins: true
  })

  return new Promise<string>(async (resolve, rejects) => {
    if (await organisationNameExistsForUser(organisationName, user)) {
      rejects(new OrganisationNameExistsForUser());
      return;
    }
    organisation.save((err, result) => {
      if (err) {
        rejects(new OrganisationCreationError());
        return;
      }

      organisationPermissions.save(async (err2, result2) => {
        if (err2) {
          rejects(new OrganisationPermissionsCreationError());
          // Remove the newly created organisation as permission creation failed
          await removeOrganisation(organisation._id)
          return;
        }
        resolve(organisation._id);
      })

    })
  })
}