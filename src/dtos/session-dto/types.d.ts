declare interface SessionDTOI extends Pick<SessionI, 'token'>{
    id: import('mongoose').Schema.Types.ObjectId
}