import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/api-v1'
import {  AuthSigninSchema } from './schema';
import { signin } from '../../services/auth-service/AuthService';

const AuthRoute: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

   fastify.post<RouteWithData<ReqData<AuthSignin>>>('/api/v1/auth/signin', { schema: AuthSigninSchema }, async (req, rep) =>{
        try {
            const sessionData = await signin(req.body.data)
    
            // if(sessionData) {

            //     req.log.info({ actor: 'Route: auth' }, `New session opened`)
            //     return rep.code(200).send({ statusCode: 200, data: sessionData })
            // }
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })
}

export default fp(AuthRoute)