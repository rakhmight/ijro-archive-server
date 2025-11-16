declare interface FileModelI extends ModelExC<FileI> {
}

declare interface FileI extends DocumentExC{
    _id: import('mongoose').Schema.Types.ObjectId,
    name: string,
    size: number
}