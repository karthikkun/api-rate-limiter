import express from 'express'
import { requestLoggingMiddleware } from './requestLogger'
import { rateLimitingMiddleware, RateLimiterRule } from './rateLimiter'
import messageRouter from './message'
import errorHandler from './errorHandler'

export default class Startup {
    app: express.Express
    rateLimiterRule: RateLimiterRule

    constructor() {
        this.app = express()
        this.rateLimiterRule = {
            endpoint: '',
            rate_limit: {
                time: 60,
                limit: 5
            }
        }
        this.setup()
    }

    // middleware
    public setup() {
        // this.app.use(express.json())
        this.app.use(requestLoggingMiddleware)
        this.app.use(rateLimitingMiddleware(this.rateLimiterRule))
        this.app.use('/message', messageRouter)
        this.app.use(errorHandler)
    }

    public run(port: number) {
        this.app.listen(port, () => {
            console.info(`server started on port:${port}`)
        })
    }
}