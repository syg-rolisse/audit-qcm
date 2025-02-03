import Permission from '#models/permission'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class PermissionSeeder extends BaseSeeder {
  public async run() {
    // Profil Admin (profilId: 1) - Toutes les permissions à true
    await Permission.create({
      profilId: 1,
      readUser: true,
      createUser: true,
      updateUser: true,
      deleteUser: true,
      readDomaine: true,
      createDomaine: true,
      updateDomaine: true,
      deleteDomaine: true,
      readTest: true,
      createTest: true,
      updateTest: true,
      deleteTest: true,
      readThematique: true,
      createThematique: true,
      updateThematique: true,
      deleteThematique: true,
      readPermission: true,
      updatePermission: true,
    })

    //Profil Utilisateur 1 (profilId: 2) - Seul `createUser` à true
    await Permission.create({
      profilId: 2,
      readUser: false,
      createUser: true,
      updateUser: false,
      deleteUser: false,
      readDomaine: false,
      createDomaine: false,
      updateDomaine: false,
      deleteDomaine: false,
      readTest: true,
      createTest: true,
      updateTest: true,
      deleteTest: false,
      readThematique: true,
      createThematique: false,
      updateThematique: false,
      deleteThematique: false,
      readPermission: false,
      updatePermission: false,
    })

    // Profil Utilisateur 2 (profilId: 3) - Seul `createUser` à true
    await Permission.create({
      profilId: 3,
      readUser: false,
      createUser: true,
      updateUser: false,
      deleteUser: false,
      readDomaine: false,
      createDomaine: false,
      updateDomaine: false,
      deleteDomaine: false,
      readTest: true,
      createTest: true,
      updateTest: true,
      deleteTest: false,
      readThematique: true,
      createThematique: false,
      updateThematique: false,
      deleteThematique: false,
      readPermission: false,
      updatePermission: false,
    })
  }
}
