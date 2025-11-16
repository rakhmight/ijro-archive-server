import { getDate } from "../utils/getDate"
import pino from 'pino'
import path from 'path'

const transport = pino.transport({
  targets: [
    {
      target: 'pino/file',
      options: {
        destination: path.join(__dirname, `../logs/general/logs-${getDate()}.log`),
      }
    },
    {
      target: 'pino/file',
      level: 'error',
      options: {
        destination: path.join(__dirname, `../logs/errors/errors-logs-${getDate()}.log`),
      }
    },
    {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    }
  ]
})

export const loggerInstance = pino(
  transport
)

export const fastifyConfig = {
    bodyLimit: 100 * 1024 * 1024
}