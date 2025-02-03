import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

/**
 * Fonction pour normaliser les adresses e-mail
 * Supprime les points dans la partie locale pour les adresses Gmail.
 */
// function normalizeEmail(email: string): string {
//   const [localPart, domain] = email.toLowerCase().split('@')
//   if (domain === 'gmail.com') {
//     return `${localPart.replace(/\./g, '')}@${domain}`
//   }
//   return email
// }

export default class extends BaseSeeder {
  public async run() {
    const users = [
      {
        fullName: 'Rolisse ADJEVI',
        email: 'rolissecodeur@gmail.com',
        phoneCode: '+229',
        phoneNumber: '61757026',
        password: 'password',
        address: 'Cotonou',
        profilId: 1,
        validEmail: true,
        status: true,
      },
      {
        fullName: 'Rolisse ADJEVI',
        email: 'cessionintegree@gmail.com',
        phoneCode: '+229',
        phoneNumber: '61757026',
        password: 'password',
        address: 'Cotonou',
        profilId: 3,
        validEmail: true,
        status: true,
      },
    ]

    // Ajoutez la normalisation des e-mails avant la sauvegarde
    await User.createMany(
      users.map((user) => ({
        ...user,
        normalizeEmail: user.email, // Normalisation
      }))
    )
  }
}
