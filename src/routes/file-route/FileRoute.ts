import { 
    FastifyInstance, 
    FastifyPluginOptions, 
    FastifyPluginAsync 
} from 'fastify';
import fp from 'fastify-plugin';
import APIError from '../../exceptions/api-v1'
import { getFiles, saveFile } from '../../services/file-service/FileService';
import path from 'path';
import fs from 'fs'

const FileRoute: FastifyPluginAsync = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {

    fastify.post('/api/v1/files', async (req, rep) =>{
        try{
            const data = await req.file()
            const fileData = await saveFile(data)

            return rep.code(200).send({ statusCode: 200, data: fileData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    
    })

    fastify.get('/api/v1/files', async (req, rep) =>{
        try {
            const filesData = await getFiles()

            return rep.code(200).send({ statusCode: 200, data: filesData })
        } catch (error) {
            return APIError(error as Error, rep, req)
        }
    })
}

export default fp(FileRoute)