import Domain from '#models/domain'
import TestDomain from '#models/test_domain'
import Text from '#models/text'
import { createDomainValidator, updateDomainValidator } from '#validators/domain'
import type { HttpContext } from '@adonisjs/core/http'
import { processErrorMessages } from '../../helpers/remove_duplicate.js'

export default class DomainsController {
  async index({ request, response }: HttpContext) {
    try {
      const { userId, thematiqueId, page = 1, perpage = 10, status } = request.qs()

      const test = await Text.query()
        .where({
          userId: userId,
          thematiqueId: thematiqueId,
          roundId: 1,
        })
        .preload('user')
        .preload('thematique')
        .first()

      if (!test) {
        return response.created({ message: 'Aucun test trouvé pour les critères fournis.' })
      }

      let tag: string
      let message: string
      // Vérification des rounds
      if (test.round2 === true) {
        tag = 'both'
        message =
          'Vous avez terminé les deux round. Vous ne pouvez que passer en revue vos resultats'
      } else if (test.round1 === true && !test.round2) {
        tag = 'once'
        message = 'Round 1 terminé. Vous pouvez essayer une dernière fois.'
      } else {
        message = 'Bonne chance!'
        tag = 'play'
      }

      // Création de la requête de base pour les domaines de test
      let query = TestDomain.query()
        .where({ textId: test.id })
        .orderBy('id', 'asc')
        .preload('TestQuestions', (TestQuestionQuery) => {
          TestQuestionQuery.orderBy('id', 'desc')
          TestQuestionQuery.preload('TestAnswers').orderBy('id', 'desc')
        })

      // Filtrage par statut si fourni
      if (status) {
        query = query.where('status', JSON.parse(status))
      }

      // Exécution de la pagination
      const domains = await query.paginate(page, perpage)

      return response.created({ message: message, tag: tag, domains, test })
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
      return response.internalServerError({
        message: 'Une erreur est survenue lors de la récupération des données.',
      })
    }
  }

  async allDomain({ auth, bouncer, request, response }: HttpContext) {
    const { page, perpage, status } = request.qs()
    const user = auth.user

    if (!user) {
      console.error('Erreur: Utilisateur non authentifié')
      return response.unauthorized('Utilisateur non authentifié')
    }

    const pageNumber = page ? Number.parseInt(page) : 1
    const perPageNumber = perpage ? Number.parseInt(perpage) : 10

    // Préchargez le profil et les permissions de l'utilisateur
    await user.load('Profil', (profilQuery: any) => {
      profilQuery.preload('Permission')
    })

    // Vérifie si l'utilisateur a l'autorisation de lire les domaines
    if (await bouncer.with('DomainePolicy').denies('view')) {
      return response.forbidden("Désolé, vous n'êtes pas autorisé à lire les domaines.")
    }

    const query = Domain.query().preload('Thematiques')

    const allDomains = await query.orderBy('id', 'desc')

    if (status) {
      query.where('status', JSON.parse(status))
    }

    const domains = await query.orderBy('id', 'desc').paginate(pageNumber, perPageNumber)

    return response.ok({ domains, allDomains })
  }

  async create({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }

      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de creer les domaines
      if (await bouncer.with('DomainePolicy').denies('create')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à ajouter des domaines.")
      }

      const payload = await request.validateUsing(createDomainValidator)

      const domain = await Domain.create(payload)

      return response.created({
        domain,
        message: 'Domaine enrégistré avec succès',
      })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async show({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }

      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de lire les domaines
      if (await bouncer.with('DomainePolicy').denies('view')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à lire les domaines.")
      }
      const { domainId } = request.qs()

      if (!domainId) {
        return response.badRequest({ status: 400, error: 'Domain ID is required' })
      }

      const domain = await Domain.findOrFail(domainId)

      response.created({ status: 200, domain })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }

  async update({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de modifier les domaines
      if (await bouncer.with('DomainePolicy').denies('update')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à modifier les domaines.")
      }
      const { domainId } = request.qs()

      const domain = await Domain.findOrFail(domainId)

      const payload = await request.validateUsing(updateDomainValidator)
      console.log(payload)

      domain.merge(payload)
      await domain.save()
      return response.created({ status: 200, message: 'Domaine modifié avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 500, error: message })
    }
  }

  async delete({ auth, bouncer, request, response }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        console.error('Erreur: Utilisateur non authentifié')
        return response.unauthorized('Utilisateur non authentifié')
      }
      // Préchargez le profil et les permissions de l'utilisateur
      await user.load('Profil', (profilQuery: any) => {
        profilQuery.preload('Permission')
      })

      // Vérifie si l'utilisateur a l'autorisation de supprimer les domaines
      if (await bouncer.with('DomainePolicy').denies('delete')) {
        return response.forbidden("Désolé, vous n'êtes pas autorisé à supprimer les domaines.")
      }
      const { domainId } = request.qs()

      const domain = await Domain.findOrFail(domainId)

      await domain.delete()
      return response.created({ status: 200, message: 'Domaine supprimé avec succès' })
    } catch (error) {
      const message = processErrorMessages(error)
      return response.badRequest({ status: 400, error: message })
    }
  }
}
