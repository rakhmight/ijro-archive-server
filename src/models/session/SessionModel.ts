import { Schema, model } from 'mongoose'

const schema: Schema = new Schema<SessionI>(
    {
        token: {
            type: String,
        }
    },
    { timestamps: true, strict: true, strictQuery: true }
)

export const SessionModel = model<SessionI, SessionModelI>('Session', schema)