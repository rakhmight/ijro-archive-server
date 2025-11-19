// modules
import fastify, { FastifyInstance } from 'fastify'
import 'dotenv/config'
import path from 'path'

//routes
import AuthRoute from './routes/auth-route/AuthRoute'
import FileRoute from './routes/file-route/FileRoute'
import PingRoute from './routes/ping-route/PingRoute'

//plugins
import { corsParams } from './plugins/cors'
import { swaggerParams } from './plugins/swagger'
import { swaggerUIParams } from './plugins/swagger/ui'
import { loggerInstance } from './configs'
import { dbPlugin, dbParams } from './plugins/db'

//middlewares
import authMiddleware from './middlewares/authMiddleware'
import { redisParams } from './plugins/redis/redis'

export const build = async () => {
    const app = fastify({ loggerInstance })
    await checkServerEnv(app as any)

    app.register(require('@fastify/cors'), corsParams)
    app.register(require('@fastify/swagger'), swaggerParams)
    app.register(require('@fastify/redis'), redisParams)
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
    app.register(PingRoute)

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
    if(!process.env.REDIS_DB_HOST || !process.env.REDIS_DB_PORT  || !process.env.REDIS_DB_PASSWORD || !process.env.REDIS_DB_INDEX){
        app.log.fatal('The environment variable responsible for connect to redis is not set')
        process.exit(1)
    }
    if(!process.env.ROOT_PASSWORD){
        app.log.fatal('The environment variable responsible for root password is not set')
        process.exit(1)
    }
}