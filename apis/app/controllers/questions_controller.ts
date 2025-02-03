import Domain from '#models/domain'
import Question from '#models/question'
import Thematique from '#models/thematique'
import { createQuestionValidator, updateQuestionValidator } from '#validators/question'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'

export default class QuestionsController {
  async allQuestions({ request, response }: HttpContext) {
    try {
      const { page, perpage, status, domainId } = request.qs()

      const query = Question.query()

      if (status) {
        // query.where('status', JSON.parse(status))
      }
      console.log(domainId)

      if (domainId) {
        query.where('domainId', domainId)
      } else {
        return response.badRequest({
          status: 400,
          error: "L'identifiant de la question est requis",
        })
      }

      const domains = await query
        .orderBy('id', 'desc')
        .preload('Answers')
        .paginate(page || 1, perpage || 10)

      return response.json(domains.toJSON())
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createQuestionValidator)

      const domain = await Domain.query().where({ id: payload.domainId }).first()
      if (!domain) {
        return response.badRequest({
          status: 400,
          error: 'Domaine non trouvé.',
        })
      }

      const thematique = await Thematique.query().where({ id: domain.thematiqueId }).first()
      if (!thematique) {
        return response.badRequest({
          status: 400,
          error: 'Thématique non trouvée.',
        })
      }

      let total = thematique.cumul + payload.point
      if (total > thematique.pointTotalQuestion) {
        return response.badRequest({
          status: 400,
          error:
            "Désolé, Le total défini est atteint. Augmenter le sur la thématique pour ajouter d'autres questions.",
        })
      }

      thematique.merge({ cumul: total })
      await thematique.save()

      const question = await Question.create({ ...payload })

      return response.created({
        question,
        message: 'Question enrégistrée avec succès',
      })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { questionId } = request.qs()

      if (!questionId) {
        return response.badRequest({
          status: 400,
          error: "L'identifiant de la question est requis",
        })
      }

      const question = await Question.findOrFail(questionId)

      response.created({ status: 200, question })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async update({ request, response }: HttpContext) {
    const trx = await db.transaction() // Démarrer la transaction

    try {
      const { questionId } = request.qs()

      const question = await Question.findOrFail(questionId)

      const payload = await request.validateUsing(updateQuestionValidator)

      if (question) {
        const domain = await Domain.query().where({ id: question.$attributes.domainId }).first()
        if (domain) {
          const thematique = await Thematique.query().where({ id: domain.thematiqueId }).first()

          if (thematique) {
            let total = thematique.cumul + payload.point
            if (total > thematique.pointTotalQuestion) {
              return response.badRequest({
                status: 400,
                error:
                  "Désolé, Le total défini est atteint. Augmenter le sur la thématique pour ajouter d'autres question.",
              })
            }
            thematique.merge({
              cumul: thematique.cumul - question.$attributes.point + payload.point,
            })
            await thematique.save()
          }
        }
      }

      question.merge(payload)
      await question.save()

      await trx.commit()

      return response.created({ status: 200, message: 'Question modifiée avec succès' })
    } catch (error) {
      await trx.rollback()
      const message = processErrorMessages(error)
      return response.badRequest({ status: 500, error: message })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { questionId } = request.qs()

      const domain = await Question.findOrFail(questionId)

      await domain.delete()
      return response.created({ status: 200, message: 'Question supprimée avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
}
