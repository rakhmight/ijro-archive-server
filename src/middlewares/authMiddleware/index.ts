import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify"
import APIError from '../../exceptions/api-v1'
import { SessionModel } from "../../models/session/SessionModel"


export default async function(req:FastifyRequest, rep:FastifyReply, done:HookHandlerDoneFunction){
    try {

        if(req.url != '/api/v1/auth/signin'){
            const { token, id } = req.cookies
            if(!token || !id) throw Error('un-auth')

            const sessionTarget = await SessionModel.findById(id)
            if(!sessionTarget) throw Error('un-auth')
            if(sessionTarget.token != token) throw Error('un-auth')

        }
        

    } catch (error) {
        return APIError(error as Error, rep, req)
    }
}