import Text from '#models/text'
import Thematique from '#models/thematique'
import User from '#models/user'
import VerifMailToken from '#models/verif_mail_token'
import { registerValidator, updateUserValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import crypto from 'node:crypto'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'
export default class UsersController {
  async dashboardInfos({ response }: HttpContext) {
    try {
      // Récupération de tous les utilisateurs
      const users = await User.query().preload('Profil')

      // Récupération de tous les tests (Remplacez `Test` par le modèle réel de tests)
      const tests = await Text.query().preload('user').preload('thematique').paginate(1, 2000)

      // Simulons un modèle distinct pour les thématiques si nécessaire
      const thematiques = await Thematique.all() // Remplacez par le modèle réel si ce n'est pas `Thematique`

      // Comptage des utilisateurs par statut
      const activeUserCount = users.filter((user) => user.status === true).length
      const inactiveUserCount = users.filter((user) => user.status === false).length

      // Comptage total des thématiques
      const totalThematique = thematiques.length

      // Comptage total des tests
      const totalTest = tests.length

      // Comptage des tests réussis et échoués
      const successfulTests = tests.filter(
        (test) => test.totalRound1 > 70 || test.totalRound2 > 70
      ).length
      const failedTests = totalTest - successfulTests

      // Comptage des thématiques par statut
      const activeThematiqueCount = thematiques.filter(
        (thematique) => thematique.status === true
      ).length
      const inactiveThematiqueCount = thematiques.filter(
        (thematique) => thematique.status === false
      ).length

      // Comptage des utilisateurs par profil
      const adminCount = users.filter(
        (user) => user.Profil?.$attributes?.wording === 'Admin'
      ).length
      const playerCount = users.filter(
        (user) => user.Profil?.$attributes?.wording === 'Player'
      ).length
      const operatorCount = users.filter(
        (user) => user.Profil?.$attributes?.wording === 'Opérateur'
      ).length

      // Comptage des tests par état d'attestation
      const availableAttestationCount = tests.filter(
        (test) => test.attestationDispo === true
      ).length
      const unavailableAttestationCount = tests.filter(
        (test) => test.attestationDispo === false
      ).length

      // Résultat final
      return {
        tests,
        statusSummary: {
          activeUsers: activeUserCount,
          inactiveUsers: inactiveUserCount,
        },
        profilSummary: {
          admin: adminCount,
          player: playerCount,
          operator: operatorCount,
        },
        thematiqueSummary: {
          total: totalThematique,
          active: activeThematiqueCount,
          inactive: inactiveThematiqueCount,
        },
        testSummary: {
          totalTests: totalTest,
          successfulTests: successfulTests,
          failedTests: failedTests,
          availableAttestation: availableAttestationCount, // Tests avec attestation disponible
          unavailableAttestation: unavailableAttestationCount, // Tests sans attestation disponible
        },
      }
    } catch (error) {
      console.error('Error fetching dashboard information:', error)
      return response.status(500).json({
        error: 'An error occurred while fetching dashboard information.',
      })
    }
  }

  async allUsers({ request, response }: HttpContext) {
    try {
      const { page, perpage, status } = request.qs()

      const pageNumber = page ? Number.parseInt(page) : 1
      const perPageNumber = perpage ? Number.parseInt(perpage) : 10

      const query = User.query().preload('Profil').orderBy('id', 'desc')

      const allUsers = await query

      if (status) {
        // query.where('status', JSON.parse(status))
      }

      const users = await query.paginate(pageNumber, perPageNumber)
      return response.ok({ users, allUsers })
    } catch (error) {
      console.error('Error fetching users:', error)
      return response.status(500).json({ error: 'An error occurred while fetching users.' })
    }
  }

  async register({ request, response }: HttpContext) {
    const trx = await db.transaction()

    try {
      const payload = await request.validateUsing(registerValidator)

      if (payload?.avatar) {
        const uniqueId = cuid() // Générer un identifiant unique
        const fileName = `${uniqueId}.${payload.avatar.extname}`
        // Créer le nom de fichier avec l'extension
        await payload.avatar.move(app.makePath('uploads/avatars'), {
          name: fileName,
          overwrite: true,
        })
        payload.avatarUrl = `avatars/${fileName}`
      }

      const user = await User.create({ ...payload, normalizeEmail: payload.email })

      let tokenGenerated: string
      let existingToken: any

      do {
        tokenGenerated = crypto.randomBytes(20).toString('hex')
        existingToken = await VerifMailToken.query().where('token', tokenGenerated).first()
      } while (existingToken)

      await VerifMailToken.create({ userId: user?.id, email: user?.email, token: tokenGenerated })

      await mail.send((message) => {
        message
          .to(user.email)
          .from('rolissecodeur@gmail.com')
          .subject('AUDIT-QCM | VALIDATION DE MAIL')
          .htmlView('emails/verify_email', {
            userId: user?.id,
            email: user?.email,
            token: tokenGenerated,
          })
      })

      await trx.commit() // Valider la transaction

      return response.created({
        status: 200,
        message: 'Nous avons bien reçu vos données. Bien vouloir vérifier votre boite mail.',
      })
    } catch (error) {
      await trx.rollback()
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      const { userId } = request.qs()

      const user = await User.findOrFail(userId)

      const payload = await request.validateUsing(updateUserValidator(userId))

      // Vérifier si un autre utilisateur utilise déjà cet e-mail
      if (payload.email && payload.email !== user.email) {
        const existingUser = await User.query().where('email', payload.email).first()
        if (existingUser) {
          return response.badRequest({
            status: 400,
            error: "L'adresse e-mail est déjà utilisée par un autre utilisateur.",
          })
        }
      }
      // console.log(payload)

      // Gestion de l'avatar
      if (payload?.avatar) {
        const uniqueId = cuid() // Générer un identifiant unique
        const fileName = `${uniqueId}.${payload.avatar.extname}`
        // Créer le nom de fichier avec l'extension
        await payload.avatar.move(app.makePath('uploads/avatars'), {
          name: fileName,
          overwrite: true,
        })
        payload.avatarUrl = `avatars/${fileName}`
      } else {
        payload.avatarUrl = user.$attributes.avatarUrl
      }
      delete payload.avatar

      // Mise à jour des informations utilisateur , normalizeEmail: payload.email
      user.merge({ ...payload })
      await user.save()

      return response.created({
        status: 200,
        message: 'Utilisateur modifié avec succès',
      })
    } catch (error) {
      console.log(error.message)

      const message = processErrorMessages(error)
      return response.badRequest({
        status: 400,
        error: message || 'Une erreur est survenue lors de la mise à jour de l’utilisateur.',
      })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { userId } = request.qs()

      if (!userId) {
        return response.badRequest({ status: 400, error: 'User ID is required' })
      }

      const user = await User.findOrFail(userId)

      response.created({ status: 200, user })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async changeAccountStatus({ request, response }: HttpContext) {
    const trx = await db.transaction()

    try {
      const { userId, userConnectedId } = request.qs()
      const { profilId, status } = request.body()

      // Vérification des entrées
      if (!profilId || status === undefined) {
        throw new Error('Profil ID et Status sont requis.')
      }

      // Récupération des utilisateurs dans la transaction
      const user = await User.query({ client: trx }).where('id', userId).firstOrFail()
      const userConnected = await User.query({ client: trx })
        .where('id', userConnectedId)
        .preload('Profil')
        .first()

      if (!userConnected) {
        throw new Error('Compte non identifié.')
      }

      if (userConnected && userConnected?.$attributes?.profilId !== 1) {
        return response.badRequest({
          status: 400,
          error: "Seule l'administrateur est autorisé à modifier les status",
        })
      }
      if (profilId === 1) {
        return response.badRequest({
          status: 400,
          error:
            "Pour des raisons de sécurité, ils ne pas permis de modiifer les informations de l'admin.",
        })
      }

      // Mise à jour des informations utilisateur avec la transaction
      user.useTransaction(trx)
      user.merge({ status: status, profilId: profilId })
      await user.save()

      // Commit de la transaction
      await trx.commit()

      return response.created({
        status: 200,
        message: status ? 'Compte activé avec succès' : 'Compte désactivé avec succès',
      })
    } catch (error) {
      // Rollback en cas d'erreur
      await trx.rollback()
      console.log(error.message)

      return response.badRequest({
        status: 400,
        error: error.message || "Une erreur est survenue lors de la mise à jour de l'utilisateur.",
      })
    } finally {
      // S'assurer que la transaction est terminée
      if (!trx.isCompleted) {
        await trx.rollback()
      }
    }
  }

  async delete({ auth, bouncer, request, response }: HttpContext) {
    try {
      const userConnected = auth.user

      if (!userConnected) {
        console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await userConnected.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de supprimer les utilisateurs
      if (await bouncer.with('UserPolicy').denies('delete')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à supprimer les utilisateurs.")
      }

      const { userId } = request.qs()

      const user = await User.findOrFail(userId)

      if (user.$attributes.profilId === 1) {
        return response.forbidden('Désolé, le compte admin ne peut être supprimer.')
      }

      user.delete()
      return response.created({ status: 200, message: 'Utilisateur supprimé avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
  async activeAccount({ request, response }: HttpContext) {
    try {
      // Récupération des paramètres de la requête
      const { userId, token, email } = request.qs()

      // Vérification que tous les paramètres nécessaires sont présents
      if (!userId || !token || !email) {
        return response.badRequest({ status: 400, message: 'Paramètres manquants.' })
      }

      // Vérification du token dans la table VerifMailToken
      const user = await VerifMailToken.query()
        .where({
          userId: userId,
          token: token,
          email: email,
        })
        .first()

      // Si le token est valide
      if (user) {
        // Trouver l'utilisateur correspondant
        const userFound = await User.findOrFail(userId)

        // Vérification si l'email est déjà validé
        if (userFound?.$attributes?.validEmail) {
          if (userFound?.$attributes?.status) {
            return response.ok({
              status: 200,
              render: 'login',
              message: 'Votre compte est déjà actif. Vous pouvez vous connecter.',
            })
          } else {
            return response.ok({
              status: 200,
              render: 'login',
              message: 'Votre mail a bien été vérifié. Patientez-que le compte soit actif.',
            })
          }
        } else {
          // Si l'email n'est pas validé, on le marque comme validé
          if (userFound.email !== email) {
            return response.badRequest({
              status: 400,
              message: "Email ne correspond pas à l'utilisateur.",
            })
          }

          userFound.merge({ validEmail: true })
          await userFound.save()

          return response.ok({
            status: 200,
            render: 'login',
            message: 'Votre mail est bien confirmé. Votre compte sera actif sous peu.',
          })
        }
      } else {
        // Si le token est invalide ou introuvable
        return response.badRequest({ status: 400, message: 'Token non reconnu !' })
      }
    } catch (error) {
      // Traitement des erreurs générales
      console.log(error.message)

      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
}

// function normalizeEmail(email: string) {
//   const [localPart, domain] = email.toLowerCase().split('@')
//   if (domain === 'gmail.com') {
//     return `${localPart.replace(/\./g, '')}@${domain}`
//   }
//   return email
// }
