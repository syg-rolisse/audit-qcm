# Utilisation de l'image de base
FROM node:20.12.2-alpine3.18 AS base

# Stage de dépendances (installation de toutes les dépendances)
FROM base AS deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Stage de dépendances de production uniquement
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Stage de build (inclut tsconfig et autres fichiers nécessaires)
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .  
RUN npm run build

# Stage de production
FROM base
ENV NODE_ENV=production
WORKDIR /app

# Copie uniquement les dépendances de production
COPY --from=production-deps /app/node_modules /app/node_modules
# Copie uniquement les fichiers compilés (pas les fichiers .ts)
COPY --from=build /app/build /app

EXPOSE 8080


# Étape de base
# FROM node:20.12.2-alpine3.18 AS base
# WORKDIR /app

# # Étape pour les dépendances (développement)
# FROM base AS dev-deps
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci

# # Étape de build
# FROM base AS build
# WORKDIR /app
# COPY --from=dev-deps /app/node_modules /app/node_modules
# COPY . .
# RUN node ace build  # Compile le projet dans le dossier /build

# # Étape finale pour le développement
# FROM base AS dev
# ENV NODE_ENV=development
# WORKDIR /app

# # Copier node_modules et les fichiers source
# COPY --from=dev-deps /app/node_modules /app/node_modules
# COPY --from=build /app/build /app/build
# COPY . .

# # Exposer le port d'AdonisJS
# EXPOSE 3333

# # Commande pour démarrer en développement avec watch
# CMD ["node", "ace", "serve", "--watch"]



