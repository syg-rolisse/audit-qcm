import vine, { SimpleMessagesProvider } from '@vinejs/vine'
// Configuration des messages d’erreur personnalisés
vine.messagesProvider = new SimpleMessagesProvider({
  'wording.trim': 'Le champ "Nom complet" est requis.',
  'wording.string': 'Le "Nom complet" doit être une chaîne de caractères.',
  'point.number': 'Le champ "point" est requis et doit être un nombre.',
  'userId.number':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'userId.required':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'questionId.number': "L'identifiant du domaine est requis",
  'questionId.required': "L'identifiant du domaine est requis",
})

export const createAnswerValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(),
    nature: vine.string().trim(),
    status: vine.boolean(),
    point: vine.number(),
    userId: vine.number(),
    questionId: vine.number(),
  })
)

export const updateAnswerValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(),
    nature: vine.string().trim(),
    status: vine.boolean(),
    point: vine.number(),
  })
)
