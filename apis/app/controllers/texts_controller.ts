import TestAnswer from '#models/test_answer'
import TestDomain from '#models/test_domain'
import TestQuestion from '#models/test_question'
import Text from '#models/text'
import Thematique from '#models/thematique'
import env from '#start/env'
import { createTestValidator } from '#validators/text'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { kkiapay } from '@kkiapay-org/nodejs-sdk'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'

export default class TextsController {
  async index({ request, response }: HttpContext) {
    try {
      const { page, perpage } = request.qs()

      const pageNumber = page ? Number.parseInt(page) : 1
      const perPageNumber = perpage ? Number.parseInt(perpage) : 10

      const query = Text.query().preload('user').preload('thematique').orderBy('id', 'desc')
      const allTests = await query.orderBy('id', 'desc')
      const tests = await query.orderBy('id', 'desc').paginate(pageNumber, perPageNumber)

      return response.ok({ tests, allTests })
    } catch (error) {
      return response.status(500).send({ error: 'Erreur interne du serveur' })
    }
  }
  async testUser({ request, response }: HttpContext) {
    try {
      const { page, perpage, userId } = request.qs()

      const pageNumber = page ? Number.parseInt(page) : 1
      const perPageNumber = perpage ? Number.parseInt(perpage) : 10

      const tests = await Text.query()
        .where({ userId: userId })
        .preload('user')
        .preload('thematique')
        .orderBy('id', 'desc')
        .paginate(pageNumber, perPageNumber)

      return response.ok({ tests })
    } catch (error) {
      return response.status(500).send({ error: 'Erreur interne du serveur' })
    }
  }

  // async index({ response, request }: HttpContext) {
  //   try {
  //     const { page, perpage } = request.qs()

  //     const pageNumber = page ? Number.parseInt(page) : 1
  //     const perPageNumber = perpage ? Number.parseInt(perpage) : 10

  //     // Récupérer les données avec pagination
  //     const paginatedQuery = await Text.query()
  //       .preload('user')
  //       .preload('thematique')
  //       .orderBy('id', 'desc')
  //       .paginate(pageNumber, perPageNumber)

  //     const allTests = paginatedQuery.all()

  //     // Retourner les deux formats
  //     return response.ok({
  //       tests: paginatedQuery,
  //       allTests,
  //     })
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //     return response.internalServerError({
  //       message: 'Une erreur est survenue lors de la récupération des données.',
  //     })
  //   }
  // }

  public async fedaPayed({ request, response }: HttpContext) {
    const trx = await db.transaction()

    try {
      const payload = request.body()

      const { testId } = request.qs()

      if (!testId) {
        return response.badRequest({ status: 400, error: 'The "testId" parameter is required.' })
      }

      const test = await Text.findOrFail(testId)

      if (test) {
        test.merge({ ...payload, status: true, attestationDispo: true })
        test.save()
      }

      await trx.commit()

      return response.created({
        message: 'Payement éffectué avec succès avec succès',
      })
    } catch (error) {
      await trx.rollback()
      console.log(error.message)

      // Traite les messages d'erreur
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
  public async kkiaPayed({ request, response }: HttpContext) {
    // Récupérer l'identifiant de la transaction depuis les paramètres de la requête
    const { testId } = request.qs()
    const { transactionId } = request.body()

    if (!transactionId) {
      return response.status(400).json({
        success: false,
        message: 'transactionId is required',
      })
    }
    console.log(transactionId)
    console.log('Private key:', env.get('KKIAPAYE_PRIVATE_KEY'))

    const privateKey = env.get('KKIAPAYE_PRIVATE_KEY')

    console.log(privateKey)

    const k = kkiapay({
      privatekey: env.get('KKIAPAYE_PRIVATE_KEY') as string,
      publickey: env.get('KKIAPAYE_PUBLIC_KEY') as string,
      secretkey: env.get('KKIAPAYE_SECRET_KEY') as string,
      sandbox: true,
    })

    try {
      // Vérification de la transaction
      const paymentResponse = await k.verify(transactionId)
      console.log(paymentResponse)

      const payload = {
        transactionId: paymentResponse.transactionId,
        amountDebited: '',
        amount: paymentResponse.amount,
        source: paymentResponse.source,
        mode: paymentResponse.source_common_name,
        country: paymentResponse.country,
        payerFullname: paymentResponse.client?.fullname,
        phone: paymentResponse?.client?.phone,
        payerEmail: paymentResponse.client?.email,
        paymentDate: paymentResponse.performed_at,
      }

      if (!testId) {
        return response.badRequest({ status: 400, error: 'The "testId" parameter is required.' })
      }

      const test = await Text.findOrFail(testId)

      if (test) {
        test.merge({ ...payload, status: true, attestationDispo: true })
        test.save()
      }
      return response.status(200).json({
        status: paymentResponse.status,
      })
    } catch (error) {
      // Gestion des erreurs
      console.log(error.message)

      return response.status(500).json({
        success: false,
        message: 'Failed to verify transaction',
        error: error.message,
      })
    }
  }
  public async create({ request, response }: HttpContext) {
    const trx = await db.transaction()

    try {
      const payload = await request.validateUsing(createTestValidator)

      const verifCopie = await Text.query({ client: trx })
        .where({
          userId: payload?.userId,
          thematiqueId: payload?.thematiqueId,
        })
        .first()

      if (!verifCopie) {
        const thematique = await Thematique.query({ client: trx })
          .where({ id: payload?.thematiqueId })
          .preload('Domains', (domainQuery) => {
            domainQuery.orderBy('id', 'asc')
            domainQuery.preload('Questions', (questionQuery) => {
              questionQuery.preload('Answers')
            })
          })
          .first()

        if (!thematique || !thematique.Domains || thematique.Domains.length === 0) {
          await trx.rollback()
          return response.badRequest({ message: 'Thématique ou domaines introuvables.' })
        }

        const text = await Text.create(
          {
            ...payload,
            purcent: thematique.$attributes.purcent,
            duration: thematique.$attributes.duration,
            amountToPay: thematique.$attributes.amountToPay,
          },
          { client: trx }
        )

        // Création des domaines, questions et réponses
        await Promise.all(
          thematique.Domains.map(async (domain) => {
            const testDomain = await TestDomain.create(
              {
                textId: text.id,
                point: domain.point,
                wording: domain.wording,
              },
              { client: trx }
            )

            // Création des questions aléatoires pour le domaine
            if (domain.Questions && domain.Questions.length > 0) {
              const randomQuestions = getRandomQuestions(domain.Questions, 10)

              for (const question of randomQuestions) {
                const testQuestion = await TestQuestion.create(
                  {
                    testDomainId: testDomain.id,
                    point: question.point,
                    wording: question.wording,
                  },
                  { client: trx }
                )

                // Création des réponses associées à chaque question
                if (question.Answers && question.Answers.length > 0) {
                  await Promise.all(
                    question.Answers.map(async (answer: any) => {
                      await TestAnswer.create(
                        {
                          testQuestionId: testQuestion.id,
                          wording: answer.wording,
                          nature: answer.nature,
                          point: answer.point,
                        },
                        { client: trx }
                      )
                    })
                  )
                }
              }
            }
          })
        )

        // Valide la transaction
        await trx.commit()

        return response.created({
          existingCopie: false,
          text,
          message: 'Le texte est lancé.',
        })
      }

      await trx.commit()

      return response.created({
        existingCopie: true,
        message: 'copie',
      })
    } catch (error) {
      // Annule la transaction en cas d'erreur
      await trx.rollback()

      // Traite les messages d'erreur
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      // Récupération du paramètre `testId` dans les query strings
      const { testId } = request.qs()

      // Validation du paramètre `testId`
      if (!testId) {
        return response.badRequest({ status: 400, error: 'The "testId" parameter is required.' })
      }

      console.log(`Fetching test with ID: ${testId}`)

      // Récupération des données avec préchargement des relations
      const test = await Text.query()
        .where('id', testId)
        .preload('thematique')
        .preload('user')
        .preload('TestDomain', (domainQuery) => {
          domainQuery.orderBy('id', 'asc').preload('TestQuestions', (questionQuery) => {
            questionQuery.orderBy('id', 'desc').preload('TestAnswers', (answerQuery) => {
              answerQuery.orderBy('id', 'desc')
            })
          })
        })
        .first()

      // Vérification si le test existe
      if (!test) {
        return response.notFound({ status: 404, error: 'Test not found.' })
      }

      // Réponse réussie avec les données du test
      return response.ok({ status: 200, test })
    } catch (error) {
      // Traitement des erreurs
      const message = processErrorMessages(error)
      return response.internalServerError({ status: 500, error: message })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { testId } = request.qs()

      const test = await Text.findOrFail(testId)

      await test.delete()
      return response.created({ status: 200, message: 'Test supprimé avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
}

// Fonction pour mélanger et sélectionner des questions aléatoires
function getRandomQuestions(questions: any[], num: number): any[] {
  const shuffled = [...questions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, num)
}
