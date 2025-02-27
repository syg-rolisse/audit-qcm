import env from '#start/env'
//import app from '@adonisjs/core/services/app' targets
import { defineConfig } from '@adonisjs/core/logger'
import app from '@adonisjs/core/services/app'

import { existsSync, mkdirSync } from 'node:fs'

// Vérifier si le dossier logs existe, sinon le créer
const logDir = './logs'
if (!existsSync(logDir)) {
  mkdirSync(logDir)
}

const loggerConfig = defineConfig({
  default: 'app',

  /**
   * The loggers object can be used to define multiple loggers.
   * By default, we configure only one logger (named "app").
   */
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      transport: {
        targets: [
          ...(!app.inProduction ? [{ target: 'pino-pretty', level: 'info' }] : []),
          ...(app.inProduction ? [{ target: 'pino/file', level: 'info' }] : []),
        ],
        // targets: targets()
        //   .push(targets.file({ destination: './logs/app.log' }))
        //   .push(targets.file({ destination: 1 }))
        //   //.pushIf(!app.inProduction, targets.pretty())
        //   //.pushIf(!app.inProduction, targets.pretty())
        //   //.pushIf(app.inProduction, targets.file({ destination: './logs/app.log' }))
        //   .toArray(),
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
