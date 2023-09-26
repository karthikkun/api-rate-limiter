import * as express from 'express'
const messageRouter = express.Router();

messageRouter.get("/", function (req: express.Request, res: express.Response, next: express.NextFunction) {
    try{
        res.status(200).send("Message: Hello");
    }
    catch(error) {
        next(error)
    }
  });

export default messageRouter