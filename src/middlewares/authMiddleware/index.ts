import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import APIError from '../../exceptions/api-v1'
import { FastifyRedis } from "@fastify/redis"


export default async function(req:FastifyRequest, rep:FastifyReply, done:HookHandlerDoneFunction){
    try {

        if(req.url != '/api/v1/auth/signin' || req.url != '/api/v1/ping'){

            console.log(req.url);
            
            
            const redis:FastifyRedis = this.redis
            const token = req.headers.token
            const id = req.headers.id
            
            if(!token || !id) throw Error('un-auth')

            const checkedToken = await redis.get(id as string)

            if(!checkedToken) throw Error('un-auth')
            if(checkedToken != token) throw Error('un-auth')
        }        

    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}