import { Schema, model } from 'mongoose'

const schema: Schema = new Schema<FileI>(
    {
        name: {
            type: String,
        },
        size: {
            type: Number
        }
    },
    { timestamps: true, strict: true, strictQuery: true }
)

export const FileModel = model<FileI, FileModelI>('File', schema)