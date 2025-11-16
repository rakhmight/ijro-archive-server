declare interface SessionModelI extends ModelExC<SessionI> {
}

declare interface SessionI extends DocumentExC{
    _id: import('mongoose').Schema.Types.ObjectId,
    token: string
}