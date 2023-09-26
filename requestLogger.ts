import * as express from "express"

export const requestLoggingMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${req.originalUrl} :: requested`)
    res.on('finish', () => {
        console.log(`${req.originalUrl} :: returned with status code: ${res.statusCode}`)
    })
    return next()
}
