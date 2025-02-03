import TestAnswer from '#models/test_answer'
import TestQuestion from '#models/test_question'
import Text from '#models/text'
import Thematique from '#models/thematique'
import { createThematiqueValidator, updateThematiqueValidator } from '#validators/thematique'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'
export default class ThematiquesController {
  async lastThematique({ response }: HttpContext) {
    try {
      const thematique = await Thematique.query()
        .where({ status: true })
        .orderBy('id', 'desc')
        .preload('Domains')
        .first()
      return response.created(thematique?.toJSON())
    } catch (error) {
      //  console.log(error)
    }
  }

  public async create({ bouncer, request, auth, response }: HttpContext) {
    const trx = await db.transaction()

    // Récupérer le fichier PDF
    const support = request.file('support')
    let supportUrl

    if (support) {
      // Vérifier le type du fichier
      if (support.subtype !== 'pdf') {
        return response.badRequest({ message: 'Le fichier téléchargé doit être un PDF.' })
      }

      if (support) {
        const uniqueId = cuid() // Générer un identifiant unique
        const fileName = `${uniqueId}.${support?.clientName}`
        // Créer le nom de fichier avec l'extension
        await support?.move(app.makePath('uploads/support'), {
          name: fileName,
          overwrite: true,
        })
        supportUrl = `support/${fileName}`
      }
    }

    try {
      const user = auth.user

      if (!user) {
        await trx.rollback()
        return response.unauthorized('Utilisateur non authentifié')
      }

      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de créer une thématique
      if (await bouncer.with('ThematiquePolicy').denies('create')) {
        await trx.rollback()
        return response.forbidden("Désolé, vous n'êtes pas autorisé à créer une thématique.")
      }

      // Valide les données de la requête
      const payload = await request.validateUsing(createThematiqueValidator)

      if (payload.purcent > payload.pointTotalQuestion) {
        await trx.rollback()
        return response.badRequest({
          status: 400,
          error: 'Désolé, le pourcentage requis ne peut excéder la limite des questions.',
        })
      }

      // Crée la thématique avec les données validées dans la transaction
      const thematique = await Thematique.create(
        { ...payload, supportUrl: supportUrl },
        { client: trx }
      )

      // Valide la transaction
      await trx.commit()

      // Renvoie une réponse de succès avec la nouvelle thématique
      return response.created({
        thematique,
        message: 'Thématique enregistrée avec succès',
      })
    } catch (error) {
      // Annule la transaction en cas d'erreur
      await trx.rollback()

      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async show({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de lire les thématiques
      if (await bouncer.with('ThematiquePolicy').denies('view')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à lire les thématiques.")
      }

      const { thematiqueId } = request.qs()

      if (!thematiqueId) {
        return response.badRequest({ status: 400, error: 'Thematique ID is required' })
      }

      const domain = await Thematique.findOrFail(thematiqueId)

      response.created({ status: 200, domain })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async update({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      // Vérification de l'utilisateur authentifié
      if (!user) {
        return response.unauthorized('Utilisateur non authentifié')
      }

      // Précharger le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérification des permissions avec le bouncer
      if (await bouncer.with('ThematiquePolicy').denies('update')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à modifier les thématiques.")
      }

      // Récupérer et valider les données de la requête
      const { thematiqueId } = request.qs()
      const thematique = await Thematique.findOrFail(thematiqueId)
      const payload = await request.validateUsing(updateThematiqueValidator)

      // Conversion des données en nombres pour les comparaisons
      const pointTotalQuestion = Number(payload.pointTotalQuestion)
      const cumul = Number.parseInt(thematique.$attributes.cumul)

      if (payload.purcent > pointTotalQuestion) {
        return response.badRequest({
          status: 400,
          error: 'Désolé, le pourcentage requis ne peut excéder la limite des questions.',
        })
      }

      if (pointTotalQuestion < cumul) {
        return response.badRequest({
          status: 400,
          error: 'Désolé, le total des questions ne peut être inférieur au cumul existant.',
        })
      }

      if (payload.status && pointTotalQuestion !== cumul) {
        return response.badRequest({
          status: 400,
          error: 'Désolé, vous devez ajouter des questions jusqu’à ce que le total soit atteint.',
        })
      }
      console.log(payload)

      // Mise à jour de la thématique
      thematique.merge(payload)
      await thematique.save()

      return response.created({ status: 200, message: 'Thématique modifiée avec succès.' })
    } catch (error) {
      // Gestion des erreurs
      const message = processErrorMessages(error)
      return response.badRequest({ status: 500, error: message })
    }
  }

  async delete({ bouncer, auth, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        // console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de supprimer les thématiques
      if (await bouncer.with('ThematiquePolicy').denies('delete')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à supprimer les thématiques.")
      }

      const { thematiqueId } = request.qs()

      const domain = await Thematique.findOrFail(thematiqueId)

      await domain.delete()
      return response.created({ domain, status: 200, message: 'Thematique supprimée avec succès' })
    } catch (error) {
      let message = ''
      if (error.code === 'E_ROW_NOT_FOUND') {
        message = 'Thématique non retrouvé.'
      } else {
        message = processErrorMessages(error)
      }

      return response.badRequest({ status: 400, error: message })
    }
  }

  async allThematiqueDash({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      const { page, perpage, status } = request.qs()

      const pageNumber = page ? Number.parseInt(page) : 1
      const perPageNumber = perpage ? Number.parseInt(perpage) : 10

      if (!user) {
        // console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de lire les thématiques
      if (await bouncer.with('ThematiquePolicy').denies('view')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à lire les thématiques.")
      }

      const query = Thematique.query()

      const allThematiques = await query.orderBy('id', 'desc')
      // status
      if (status) {
        query.where('status', JSON.parse(status))
      }
      const thematiques = await query.orderBy('id', 'desc').paginate(pageNumber, perPageNumber)

      return response.ok({ thematiques, allThematiques })
    } catch (error) {
      // console.error('Erreur lors de la récupération des thematiques:', error)
      return response.status(500).send({ error: 'Erreur interne du serveur' })
    }
  }

  async allThematique({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      const { page, perpage, status } = request.qs()

      const pageNumber = page ? Number.parseInt(page) : 1
      const perPageNumber = perpage ? Number.parseInt(perpage) : 10

      if (!user) {
        // console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de lire les thématiques
      if (await bouncer.with('ThematiquePolicy').denies('view')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à lire les thématiques.")
      }

      const query = Thematique.query()

      const allThematiques = await query.orderBy('id', 'desc').where('status', true)
      // status
      if (status) {
        query.where('status', JSON.parse(status))
      }
      const thematiques = await query.orderBy('id', 'desc').paginate(pageNumber, perPageNumber)

      return response.ok({ thematiques, allThematiques })
    } catch (error) {
      // console.error('Erreur lors de la récupération des thematiques:', error)
      return response.status(500).send({ error: 'Erreur interne du serveur' })
    }
  }

  async answerChosen({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const { roundId, questionId, testId, answerId } = request.body()

      const testQuestion = await TestQuestion.findOrFail(questionId)

      testQuestion.useTransaction(trx)

      const test = await Text.findOrFail(testId)
      test.useTransaction(trx)

      if (roundId === 1) {
        testQuestion.merge({ chosenRound1: true })
      }
      if (roundId === 2) {
        testQuestion.merge({ chosenRound2: true })
      }

      await testQuestion.save()

      const answer = await TestAnswer.findOrFail(answerId)
      answer.useTransaction(trx)

      let data = {}

      if (roundId === 1) {
        data = {
          chosenRound1: true,
        }

        if (answer.$attributes.nature === 'br') {
          test.merge({ totalRound1: test.$attributes.totalRound1 + answer.$attributes.point })
          test.save()
        }
      } else {
        data = {
          chosenRound2: true,
        }
        if (answer.$attributes.nature === 'br') {
          test.merge({ totalRound2: test.$attributes.totalRound2 + answer.$attributes.point })
          test.save()
        }
      }

      answer.merge(data)
      await answer.save()

      await trx.commit()

      const message = answer.nature === 'br' ? 'Bonne Réponse' : 'Mauvaise réponse'

      return response.ok({ nature: answer.nature, message })
    } catch (error) {
      await trx.rollback()

      return response.status(500).send({
        message: 'Une erreur est survenue, veuillez réessayer.',
      })
    }
  }

  async closeRound({ request, response }: HttpContext) {
    try {
      const { userId, thematiqueId, roundId } = request.qs()

      if (!userId || !thematiqueId || !roundId) {
        return response.badRequest({
          message: 'Les paramètres userId, thematiqueId et roundId sont requis.',
        })
      }

      const round = await Text.query()
        .where({ userId: userId, thematiqueId: thematiqueId, roundId: 1 })
        .preload('TestDomain', (testDomainQuery) => {
          testDomainQuery.preload('TestQuestions', (TestQuestionsQuery) => {
            TestQuestionsQuery.preload('TestAnswers')
          })
        })
        .first()

      if (!round) {
        return response.notFound({ message: 'Round non trouvé.' })
      }

      let data = {}

      if (roundId === '1') {
        let totalRound1 = 0

        round.TestDomain.forEach((domain) => {
          domain.TestQuestions.forEach((question) => {
            question.TestAnswers.forEach((answer) => {
              if (answer.chosenRound1 === true && answer.nature === 'br') {
                totalRound1 = totalRound1 + answer.point || 0
              }
            })
          })
        })

        data = { round1: true, totalRound1 }
      }

      if (roundId === '2') {
        let totalRound2 = 0

        round.TestDomain.forEach((domain) => {
          domain.TestQuestions.forEach((question) => {
            question.TestAnswers.forEach((answer) => {
              if (answer.chosenRound2 === true && answer.nature === 'br') {
                totalRound2 = totalRound2 + answer.point || 0
              }
            })
          })
        })

        //console.log(`Total points for Round 2: ${totalRound2}`)
        data = { round2: true, totalRound2 }
      }

      round.merge(data)
      await round.save()

      return response.created({ message: 'Partie terminée !', round })
    } catch (error) {
      return response.internalServerError({
        message: 'Erreur interne du serveur.',
        error: error.message,
      })
    }
  }
}
