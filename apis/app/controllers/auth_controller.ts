import ResetUserPasswordToken from '#models/reset_user_password_token'
import User from '#models/user'
import { loginValidator, passwordResetValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import crypto from 'node:crypto'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'

export default class AuthController {
  async index() {
    return { API: 'Audit-Qcm' }
  }

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(loginValidator)

      // Chercher l'utilisateur par email
      const userConnected = await User.findBy('email', email)
      if (!userConnected) {
        return response.badRequest({
          status: 400,
          error: "L'adresse e-mail fournie n'est pas retrouvée.",
        })
      }

      // Vérifier les informations d'identification
      const isValidCredentials = await User.verifyCredentials(email, password)
      if (!isValidCredentials) {
        return response.badRequest({
          status: 400,
          error: "Les informations d'identification ne sont pas valides. Veuillez réessayer.",
        })
      }

      // Vérifier que l'email de l'utilisateur est confirmé
      if (!userConnected?.$attributes?.validEmail) {
        return response.badRequest({
          status: 400,
          error: "Votre mail n'a pas été confirmé. Vérifiez votre boîte mail.",
        })
      }

      // Vérifier que le compte est actif
      if (!userConnected?.$attributes?.status) {
        return response.badRequest({
          status: 400,
          error: 'Votre compte est inactif.',
        })
      }

      // Créer un jeton d'accès pour l'utilisateur
      const token = await User.accessTokens.create(userConnected)
      if (!token) {
        return response.internalServerError({
          status: 500,
          error: 'Une erreur est survenue lors de la création du token. Veuillez réessayer.',
        })
      }

      // Retourner l'utilisateur avec le jeton
      return response.created({
        user: {
          id: userConnected.id,
          email: userConnected.email,
          fullName: userConnected.fullName,
          address: userConnected.address,
          validEmail: userConnected.validEmail,
          status: userConnected.status,
          phoneNumber: userConnected.phoneNumber,
          profilId: userConnected.profilId,
          avatarUrl: userConnected.avatarUrl,
          token: token,
        },
      })
    } catch (error) {
      console.log(error.message)

      // Gérer les erreurs spécifiques ou génériques
      return response.badRequest({
        status: 400,
        error:
          error.message === 'Invalid user credentials'
            ? 'Mot de passe incorrect'
            : 'Une erreur est survenue. Veuillez réessayer.',
      })
    }
  }

  // async login({ request, response }: HttpContext) {
  //   try {
  //     const { email, password } = await request.validateUsing(loginValidator)
  //     console.log(request.body())

  //     const userConnected = await User.findBy('email', email)
  //     if (!userConnected) {
  //       return response.badRequest({
  //         status: 400,
  //         error: "L'adresse e-mail fournie n'est pas retrouvée.",
  //       })
  //     }

  //     const isValidCredentials = await User.verifyCredentials(email, password)
  //     if (!isValidCredentials) {
  //       return response.badRequest({
  //         status: 400,
  //         error: "Les informations d'identification ne sont pas valides. Veuillez réessayer.",
  //       })
  //     }

  //     await userConnected.preload('userProfils') // Précharge les profils associés à l'utilisateur

  //     if (userConnected && !userConnected?.$attributes?.validEmail) {
  //       return response.badRequest({
  //         status: 400,
  //         error: "Votre mail n'a pas été confirmé. Vérifier votre boite et span.",
  //       })
  //     }

  //     if (userConnected && !userConnected?.$attributes?.status) {
  //       return response.badRequest({
  //         status: 400,
  //         error: 'Votre compte est inactif.',
  //       })
  //     }

  //     const token = await User.accessTokens.create(userConnected)
  //     if (!token) {
  //       return response.internalServerError({
  //         status: 500,
  //         error: 'Une erreur est survenue lors de la création du token. Veuillez réessayer.',
  //       })
  //     }

  //     const user = { ...userConnected.toJSON(), token }

  //     return response.created({ user })
  //   } catch (error) {
  //     console.log(error.message)

  //     return response.badRequest({
  //       status: 400,
  //       error:
  //         error.message === 'Invalid user credentials'
  //           ? 'Mot de passe incorrect'
  //           : 'Une erreur est survenue. Veuillez réessayer.',
  //     })
  //   }
  // }

  async verif_token_to_change_password({ request, response }: HttpContext) {
    try {
      const { userId, token, email } = request.qs()

      if (!userId || !token || !email) {
        return response.badRequest({ status: 400, message: 'Paramètres manquants.' })
      }

      const validToken = await ResetUserPasswordToken.query()
        .where({
          userId: userId,
          token: token,
          email: email,
        })
        .first()

      if (validToken) {
        const isTokenExpired = DateTime.now() > validToken.expiredDate
        const isTokenUsed = validToken.isUsed

        if (isTokenUsed || isTokenExpired) {
          return response.badRequest({
            status: 400,
            message: 'Ce lien a expiré ou a déjà été utilisé',
          })
        } else {
          return response.ok({
            status: 200,
            render: 'login',
            message: "Bien vouloir réinitialiser votre mot de passe avant que le lien n'expire",
          })
        }
      } else {
        return response.badRequest({ status: 400, message: 'Token non reconnu !' })
      }
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async verif_email({ request, response }: HttpContext) {
    try {
      const { email } = request.qs()

      console.log(request.qs())

      const user = await User.query().where({ email: email }).first()
      if (user) {
        let tokenGenerated: string
        let existingToken: any

        do {
          tokenGenerated = crypto.randomBytes(20).toString('hex')
          existingToken = await ResetUserPasswordToken.query()
            .where('token', tokenGenerated)
            .first()
        } while (existingToken)

        await ResetUserPasswordToken.create({
          userId: user?.id,
          email: user?.email,
          token: tokenGenerated,
          expiredDate: DateTime.now().plus({ minute: 60 }),
        })

        await mail.send((message) => {
          message
            .to(user.email)
            .from('rolissecodeur@gmail.com')
            .subject('AUDIT-QCM | VALIDATION DE MAIL')
            .htmlView('emails/reset_password_verif_email', {
              userId: user?.id,
              email: user?.email,
              token: tokenGenerated,
            })
        })

        return response.created({
          message: 'Un mail vous a été envoyé. Vérifier votre boite et courier indesirable',
        })
      } else {
        return response.badRequest({
          status: 400,
          error: 'Adresse e-mail intouvable.',
        })
      }
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async change_password({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const { userId, token, email } = request.qs()

      if (!userId || !token || !email) {
        return response.badRequest({ status: 400, message: 'Paramètres manquants.' })
      }

      const validToken = await ResetUserPasswordToken.query()
        .where({
          userId: userId,
          token: token,
          email: email,
        })
        .first()

      if (validToken) {
        const isTokenExpired = DateTime.now() > validToken.expiredDate
        const isTokenUsed = validToken.isUsed

        if (isTokenUsed) {
          await trx.rollback()
          return response.badRequest({
            status: 400,
            message: 'Ce lien a déjà été utilisé.',
          })
        }

        if (isTokenExpired) {
          await trx.rollback()
          return response.badRequest({
            status: 400,
            message: 'Ce lien a expiré.',
          })
        }

        const user = await User.findOrFail(userId)
        const payload = await request.validateUsing(passwordResetValidator)

        // Mise à jour des informations utilisateur
        user.useTransaction(trx)
        user.merge({ phoneCode: payload?.password, password: payload?.password, validEmail: true })
        await user.save()

        // Marquer le lien comme utilisé
        validToken.useTransaction(trx)
        validToken.merge({ isUsed: true })
        await validToken.save()

        await trx.commit()

        return response.created({
          status: 200,
          message: 'Mot de passe modifié avec succès',
        })
      } else {
        await trx.rollback()
        return response.badRequest({ status: 400, message: 'Token non reconnu !' })
      }
    } catch (error) {
      console.log(error.message)
      await trx.rollback()

      const message = processErrorMessages(error)
      return response.badRequest({
        status: 400,
        error: message || 'Une erreur est survenue lors de la mise à jour de l’utilisateur.',
      })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    console.log('ffffffffffffffff')

    const user = await auth.authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return response.ok({
      success: true,
      message: 'User logged out',
      data: user,
    })
  }

  async me({}: HttpContext) {}
}

// function normalizeEmail(email: string) {
//   const [localPart, domain] = email.toLowerCase().split('@')
//   if (domain === 'gmail.com') {
//     return `${localPart.replace(/\./g, '')}@${domain}`
//   }
//   return email
// }
