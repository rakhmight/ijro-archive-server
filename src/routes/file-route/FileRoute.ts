import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/api-v1'

const FileRoute: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.post('/api/v1/files', async (req, rep) =>{
    })

    fastify.get('/api/v1/files/:name', async (req, rep) =>{
    })

    fastify.get('/api/v1/files', async (req, rep) =>{
    })
}

export default fp(FileRoute)