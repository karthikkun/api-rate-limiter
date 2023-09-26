import * as express from "express"
import { redisClient } from "./redis"

interface RateLimiterRule {
    endpoint: string;
    rate_limit: {
        time: number;
        limit: number;
    }
}


export const rateLimitingMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return next()
}
