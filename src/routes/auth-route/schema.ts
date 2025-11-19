import { BadRequestError, InternalServerError, NotFoundError } from "../generalSchemas";

export const AuthSigninSchema = {
    summary: 'Sign in',
    description: 'Sign in for get token',
    tags: ['Auth route'],
    body: {

        description: 'Request parameters',
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {
                    password: {
                        type: 'string'
                    }
                },
                required: ['password']
            }
        },
        required: ['data']
    },
    response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            statusCode: { type: 'integer', default: 200 },
            data: {
                type: 'object',
                properties: {
                    token: {
                        type: 'string'
                    },
                    id: {
                        type: 'string'
                    }
                }
            }
          }
        },
        400: BadRequestError,
        404: NotFoundError,
        500: InternalServerError
    }
}