import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/api-v1'
import {  AuthSigninSchema } from './schema';
import { logout, signin } from '../../services/auth-service/AuthService';

const AuthRoute: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

   fastify.post<RouteWithData<ReqData<AuthSignin>>>('/api/v1/auth/signin', { schema: AuthSigninSchema }, async (req, rep) =>{
        try {
            const sessionData = await signin(req.body.data)
    
            if(sessionData) {
                req.log.info({ actor: 'Route: auth' }, `New session opened`)
                rep.cookie('token', sessionData.token, { maxAge: 3*24*60*60*1000, httpOnly: true , path: '/'})
                rep.cookie('id', ''+sessionData.id, { maxAge: 3*24*60*60*1000, httpOnly: true , path: '/'})
                return rep.code(200).send({ statusCode: 200 })
            }
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })

   fastify.post('/api/v1/auth/logout', { schema: AuthSigninSchema }, async (req, rep) =>{
        try {
            const { id } = req.cookies
            const sessionData = await logout(id!)
    
            if(sessionData) {
                req.log.info({ actor: 'Route: auth' }, `Session closed`)
                rep.clearCookie('token', { path: '/' })
                rep.clearCookie('id', { path: '/' })
                return rep.code(200).send({ statusCode: 200 })
            }
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })
}

export default fp(AuthRoute)