// modules
import fastify, { FastifyInstance } from 'fastify'
import 'dotenv/config'

//routes
import AuthRoute from './routes/auth-route/AuthRoute'
import FileRoute from './routes/file-route/FileRoute'

//plugins
import { corsParams } from './plugins/cors'
import { swaggerParams } from './plugins/swagger'
import { cookieParams } from './plugins/cookie'
import { swaggerUIParams } from './plugins/swagger/ui'
import { loggerInstance } from './configs'
import { dbPlugin, dbParams } from './plugins/db'

//types
import type { FastifyCookieOptions } from '@fastify/cookie'
import path from 'path'
import authMiddleware from './middlewares/authMiddleware'

export const build = async () => {
    const app = fastify({ loggerInstance })
    await checkServerEnv(app as any)

    app.register(require('@fastify/cors'), corsParams)
    app.register(require('@fastify/swagger'), swaggerParams)
    app.register(require('@fastify/cookie'), cookieParams as FastifyCookieOptions)
    app.register(require('@fastify/swagger-ui'), swaggerUIParams)
    app.register(dbPlugin, dbParams)
    app.register(require('@fastify/multipart'), {
        limits: {
            files: 1
        }
    })
    app.register(require('@fastify/static'), {
      root: path.join(__dirname, 'store'),
      prefix: '/public/',
    })


    app.register(AuthRoute)
    app.register(FileRoute)

    app.addHook('onRequest', authMiddleware)

    app.after()
    return app
}

async function checkServerEnv(app: FastifyInstance){

    if(!process.env.SERVER_PORT){
        app.log.fatal('The environment variable responsible for the server port is not set')
        process.exit(1)
    }
    
    if(!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME){
        app.log.fatal('The environment variable responsible for connecting to the MongoDB database is not set')
        process.exit(1)
    }
    if(!process.env.COOKIE_SECRETE){
        app.log.fatal('The environment variable responsible for cookie encrypt is not set')
        process.exit(1)
    }
    if(!process.env.ROOT_PASSWORD){
        app.log.fatal('The environment variable responsible for root password is not set')
        process.exit(1)
    }
}