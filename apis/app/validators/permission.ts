import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// Configuration des messages d’erreur personnalisés
vine.messagesProvider = new SimpleMessagesProvider({
  'profilId.number': 'Le Profil doit être un nombre.',
  'profilId.required': 'Le Profil est requis.',
})

export const updatePermissionValidator = vine.compile(
  vine.object({
    profilId: vine.number(),
    createDomaine: vine.boolean().optional(),
    createTest: vine.boolean().optional(),
    createThematique: vine.boolean().optional(),
    createUser: vine.boolean().optional(),
    deleteDomaine: vine.boolean().optional(),
    deleteTest: vine.boolean().optional(),
    deleteThematique: vine.boolean().optional(),
    deleteUser: vine.boolean().optional(),
    readDomaine: vine.boolean().optional(),
    readTest: vine.boolean().optional(),
    readThematique: vine.boolean().optional(),
    readUser: vine.boolean().optional(),
    updateDomaine: vine.boolean().optional(),
    updateTest: vine.boolean().optional(),
    updateThematique: vine.boolean().optional(),
    updateUser: vine.boolean().optional(),
    updatePermission: vine.boolean().optional(),
    readPermission: vine.boolean().optional(),
  })
)
