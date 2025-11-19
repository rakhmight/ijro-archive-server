export default function(file:FileI):FileDTOI{
    const fileDTO:FileDTOI = {
        id: file._id,
        name: file.name,
        size: file.size,
        createdAt: file.createdAt
    }

    return fileDTO
}