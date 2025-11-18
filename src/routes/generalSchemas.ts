export const BadRequestError = {
    description: 'Bad request (request parameters not taken into account)',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 400 },
      message: { type: 'string', default: 'Bad request' }
    }
}
export const NotFoundError = {
    description: 'Not found (resourse)',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 404 },
      message: { type: 'string', default: 'Not found' }
    }
}

export const AccessDeniedError = {
    description: 'Access dined',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 403 },
      message: { type: 'string', default: 'Forbidden' }
    }
}

export const InternalServerError = {
    description: 'Some server internal problems',
    type: 'object',
    properties: {
      statusCode: { type: 'integer', default: 500 },
      message: { type: 'string', default: 'Internal problems' }
    }
}