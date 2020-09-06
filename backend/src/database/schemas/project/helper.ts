import Project, { IProjectSchema } from './index'
import ProjectRemovalError from '../../../errors/project/ProjectRemovalError'
import { stringToObjectID } from '../../utils'
import ProjectFindOneError from '../../../errors/project/ProjectFindOneError'

export async function removeProject (id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    Project.remove({ _id: id }, err => {
      if (err) {
        reject(new ProjectRemovalError())
        return
      }
      resolve()
    })
  })
}

export async function getProject (projectId: any): Promise<IProjectSchema> {
  return new Promise<IProjectSchema>((resolve, reject) => {
    Project.findOne({ _id: stringToObjectID(projectId) }, (err, result) => {
      if (err || result == null) {
        reject(new ProjectFindOneError())
        return
      }
      resolve(result)
    })
  })
}
