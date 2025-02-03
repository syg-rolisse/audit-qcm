import vine, { SimpleMessagesProvider } from '@vinejs/vine'
// Configuration des messages d’erreur personnalisés
vine.messagesProvider = new SimpleMessagesProvider({
  'duration.trim': 'La durée du test est requise.',
  'duration.number': 'La durée du test est requise et doit être un nombre.',
  'wording.trim': 'Le champ "Nom complet" est requis.',
  'wording.string': 'Le "Nom complet" doit être une chaîne de caractères.',
  'purcent.number': 'Le pourcentage est requis et doit être un nombre.',
  'userId.number':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'userId.required':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
})

export const createThematiqueValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(), // Ajout de `.required()` si nécessaire
    purcent: vine.number(),
    pointTotalQuestion: vine.number(),
    duration: vine.number(),
    userId: vine.number(),
    status: vine.boolean().optional(),
    amountToPay: vine.string().optional(),
  })
)

export const updateThematiqueValidator = vine.compile(
  vine.object({
    wording: vine.string().trim(),
    duration: vine.number(),
    pointTotalQuestion: vine.number(),
    purcent: vine.number(),
    status: vine.boolean().optional(),
    amountToPay: vine.string().optional(),
  })
)
