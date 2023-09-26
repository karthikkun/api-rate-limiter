import {createClient, RedisClientType} from 'redis'

const REDIS_CONFIG = {
    HOST: "127.0.0.1",
    PORT: 6379
}

export const redisClient = (() => {
    var redisClient: RedisClientType
    
    return {
      getInstance: () => {
          if (!redisClient) {
              redisClient = createClient({
                socket: {
                    host: REDIS_CONFIG.HOST,
                    port: REDIS_CONFIG.PORT
                }
            })
          }
          return redisClient.connect()
      },
    };
  })();
  



