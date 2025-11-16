// modules
import fastify, { FastifyInstance } from 'fastify'
import 'dotenv/config'

//routes
import AuthRoute from './routes/auth-route/AuthRoute'
import FileRoute from './routes/file-route/FileRoute'

//plugins
import { corsParams } from './plugins/cors'
import { swaggerParams } from './plugins/swagger'
import { swaggerUIParams } from './plugins/swagger/ui'
import { loggerInstance } from './configs'
import { dbPlugin, dbParams } from './plugins/db'

//types

export const build = async () => {
    const app = fastify({ loggerInstance })
    await checkServerEnv(app as any)

    app.register(require('@fastify/cors'), corsParams)
    app.register(require('@fastify/swagger'), swaggerParams)
    app.register(require('@fastify/swagger-ui'), swaggerUIParams)
    app.register(dbPlugin, dbParams)

    app.register(AuthRoute)
    app.register(FileRoute)

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
}