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
  'domainId.number': "L'identifiant du domaine est requis",
  'domainId.required': "L'identifiant du domaine est requis",
})

export const createQuestionValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(), // Ajout de `.required()` si nécessaire
    point: vine.number(),
    userId: vine.number(),
    domainId: vine.number(),
    status: vine.boolean().optional(),
  })
)

export const updateQuestionValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(),
    point: vine.number(),
    status: vine.boolean().optional(),
  })
)
