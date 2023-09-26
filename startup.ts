import * as express from 'express'
import { requestLoggingMiddleware } from './requestLogger'
import { rateLimitingMiddleware } from './rateLimiter'

export default class Startup {
    app: any

    constructor() {
        this.app = express()
    }

    // middleware
    public setup() {
        this.app.use(express.json())
        this.app.use(requestLoggingMiddleware)
        this.app.use(rateLimitingMiddleware)
    }

    public run(port: number) {
        this.app.listen(port, () => {
            console.info(`server started on port:${port}`)
        })
    }
}