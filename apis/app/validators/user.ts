import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// Configuration des messages d’erreur personnalisés
vine.messagesProvider = new SimpleMessagesProvider({
  'fullName.trim': 'Le champ "Nom complet" est requis.',
  'fullName.string': 'Le champ "Nom complet" doit être une chaîne de caractères.',
  'phoneNumber.trim': 'Le champ "Numéro de téléphone" est requis.',
  'address.trim': 'Le champ adresse est requis.',
  'profilId.number': 'Le champ "Profil" doit être un nombre.',
  'profilId.required': 'Le champ "Profil" est requis.',
  'email.email': 'Veuillez entrer une adresse email valide.',
  'email.unique': 'Cette adresse email est déjà utilisée.',
  'password.trim': 'Le mot de passe est requis.',
  'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères.',
  'avatar.extnames': 'Le champ "Photo de profil" doit être une image (png, jpg, jpeg).',
  'avatar.size': 'La taille de la photo de profil doit être inférieure à 5 Mo.',
})

// Définition du champ `password`
const password = vine.string().minLength(6).optional()

// Validators
export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    phoneNumber: vine.string().trim().optional(),
    profilId: vine.number(), // Remplacement de `profil` par `profilId`
    address: vine.string().trim(),
    status: vine.boolean().optional(),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .trim()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
    avatarUrl: vine.string().optional(),
    avatar: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '5mb' }).optional(),
  })
)

export const updateUserValidator = (userId: number) =>
  vine.compile(
    vine.object({
      fullName: vine.string().trim(),
      phoneNumber: vine.string().trim(),
      address: vine.string().trim(),
      profilId: vine.number(), // Remplacement de `profil` par `profilId`
      status: vine.boolean().optional(),
      email: vine
        .string()
        .email()
        .normalizeEmail()
        .trim()
        .unique(async (db, value) => {
          const match = await db
            .from('users')
            .select('id')
            .where('email', value)
            .whereNot('id', userId) // Exclure l'utilisateur actuel
            .first()
          return !match
        }),
      password,
      avatarUrl: vine.string().optional(),
      avatar: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '5mb' }).optional(),
    })
  )

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail().trim(),
    password,
  })
)
