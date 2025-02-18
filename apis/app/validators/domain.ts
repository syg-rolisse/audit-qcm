import vine, { SimpleMessagesProvider } from '@vinejs/vine'
// Configuration des messages d’erreur personnalisés
vine.messagesProvider = new SimpleMessagesProvider({
  'wording.trim': 'Le champ "Nom complet" est requis.',
  'wording.string': 'Le "Nom complet" doit être une chaîne de caractères.',
  'userId.number':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'userId.required':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'thematiqueId.number': "L'identifiant de la thématique est requise.",
  'thematiqueId.required': "L'identifiant de la thématique est requise.",
})

export const createDomainValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(), // Ajout de `.required()` si nécessaire
    point: vine.number().optional(),
    userId: vine.number(),
    status: vine.boolean().optional(),
    thematiqueId: vine.number(),
  })
)

export const updateDomainValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(),
    point: vine.number().optional(),
    thematiqueId: vine.number(),
    status: vine.boolean().optional(),
  })
)
