declare interface FileDTOI extends Pick<FileI, 'name' | 'size'>{
    id: import('mongoose').Schema.Types.ObjectId
}