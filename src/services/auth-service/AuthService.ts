import 'dotenv/config'
import genToken from '../../utils/genToken'
import { FastifyRedis } from '@fastify/redis'

export const signin = async (userData: AuthSignin, redis:FastifyRedis) => {

    if(userData.password != process.env.ROOT_PASSWORD) throw new Error('not-found')

    const token = genToken(32)
    const id = `${Date.now()}-${genToken(8)}`

    const tokenData = await redis.set(id, token, 'EX', 1*24*60*60)

    if(tokenData) return {
        id, token
    }
}

export const logout = async (id: string, redis:FastifyRedis) => {
    const tokenData = await redis.del(id)
    if(tokenData) return tokenData
}