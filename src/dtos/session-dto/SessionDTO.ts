export default function(session:SessionI):SessionDTOI{
    const sessionDTO:SessionDTOI = {
        id: session._id,
        token: session.token,
    }

    return sessionDTO
}