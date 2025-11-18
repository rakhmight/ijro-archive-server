import FileDTO from "../../dtos/file-dto/FileDTO"
import { FileModel } from "../../models/file/FileModel"
import fs from 'fs/promises';
import path from 'path'

export const saveFile = async (data:any) => {
    if(!data) throw new Error('not-found')
    const bufferData = await data.toBuffer()

    // check dubl
    const dublFile = await FileModel.findOne({ name: data.filename })
    if(dublFile) throw new Error('dubl-file')

    // save to fs
    const file = await fs.writeFile(path.join(__dirname, `../../store/${data.filename}`), bufferData)

    // save to db
    const fileData = await FileModel.create({
        name: data.filename,
        size: bufferData.length
    })

    return FileDTO(fileData)
}

export const getFiles = async () => {
    const files = await FileModel.find()
    const filesData = files.map(f => FileDTO(f))

    return filesData
}