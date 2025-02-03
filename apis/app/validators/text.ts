import vine, { SimpleMessagesProvider } from '@vinejs/vine'
// Configuration des messages d’erreur personnalisés
vine.messagesProvider = new SimpleMessagesProvider({
  'userId.number':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'userId.required':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",

  'thematiqueId.number':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'thematiqueId.required':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",

  'roundId.number':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
  'roundId.required':
    "Identifiant de l'utilisateur connecté non reconnu. Votre session a surement expiré.",
})

export const createTestValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    thematiqueId: vine.number(),
    roundId: vine.number(),
    thematiqueWording: vine.string().optional(),
  })
)
// export const fedaPayeValidator = vine.compile(
//   vine.object({
//     transactionId: vine.number(),
//     payerFullname: vine.string(),
//     payerEmail: vine.string(),
//     amountDebited: vine.string(),
//     amount: vine.string(),
//     paymentDate: vine.string(),
//     thematiqueWording: vine.string().optional(),
//   })
// )
