import 'dotenv/config'
import genToken from '../../utils/genToken'
import { SessionModel } from '../../models/session/SessionModel'
import SessionDTO from '../../dtos/session-dto/SessionDTO'

export const signin = async (userData: AuthSignin) => {
    if(userData.password != process.env.ROOT_PASSWORD) throw new Error('not-found')

        const token = genToken(32)

        const session = await SessionModel.create({
            token
        })

        if(session) return SessionDTO(session)
}