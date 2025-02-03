import Answer from '#models/answer'
import { createAnswerValidator, updateAnswerValidator } from '#validators/answer'
import type { HttpContext } from '@adonisjs/core/http'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'

export default class AnswersController {
  async create({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createAnswerValidator)

      if (payload.nature === 'br') {
        const existGoodAnswer = await Answer.query()
          .where({ questionId: payload.questionId, nature: 'br' })
          .first()

        if (existGoodAnswer) {
          return response.badRequest({
            status: 400,
            error: 'Désolé, une bonne réponse a déjà été ajoutée.',
          })
        }
      }

      await Answer.create(payload)

      return response.created({
        message: 'Réponse enrégistré avec succès',
      })
    } catch (error) {
      console.log(error.message)

      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async show({ request, response }: HttpContext) {
    try {
      const { answerId } = request.qs()

      if (!answerId) {
        return response.badRequest({
          status: 400,
          error: "L'identifiant de la question est requis",
        })
      }

      const answer = await Answer.findOrFail(answerId)

      response.created({ status: 200, answer })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async update({ request, response }: HttpContext) {
    try {
      console.log(request.body())

      const { answerId } = request.qs()

      const domain = await Answer.findOrFail(answerId)

      const payload = await request.validateUsing(updateAnswerValidator)

      domain.merge(payload)
      await domain.save()
      return response.created({ status: 200, message: 'Answer modifiée avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 500, error: message })
    }
  }

  async delete({ request, response }: HttpContext) {
    try {
      const { answerId } = request.qs()

      const domain = await Answer.findOrFail(answerId)

      await domain.delete()
      return response.created({ status: 200, message: 'Answer supprimée avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
}
