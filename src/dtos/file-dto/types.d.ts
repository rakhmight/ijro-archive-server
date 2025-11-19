declare interface FileDTOI extends Pick<FileI, 'name' | 'size' | 'createdAt'>{
    id: import('mongoose').Schema.Types.ObjectId
}