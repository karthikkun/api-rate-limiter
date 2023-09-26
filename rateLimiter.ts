import * as express from "express"
import { redis } from "./redis"
import { RedisClientType } from "redis";

export interface RateLimiterRule {
    endpoint: string;
    rate_limit: {
        time: number;
        limit: number;
    }
}


export const rateLimitingMiddleware = (rule: RateLimiterRule) => {
    const {endpoint, rate_limit} = rule
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const ipAddr = req.ip
        const redisId = `${endpoint}/${ipAddr}`
        const redisClient = await redis.getInstance()
        const requests = await redisClient.incr(redisId)

        if (requests == 1) {
            await redisClient.expire(redisId, rate_limit.time)
        }

        if (requests > rate_limit.limit) {
            return res.status(429).send({
                message: 'too many requests!'
            })
        }
        next()
    }
}
