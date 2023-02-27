import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Mehods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { NextFunction, RequestHandler, Request, Response } from 'express';

function bodyValidators(keys: string): RequestHandler {
  return function(req: Request, res: Response, next: NextFunction) {
    if(!req.body) {
      res.status(422).send('Invalid request');
      return;
    }

    for(let key of keys) {
      if (!req.body[key]) {
        res.status(422).send('Invalid request');
      }
    }

    next();
  }
}

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key)
      const method: Mehods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(
        MetadataKeys.middleware,
        target.prototype, 
        key
      ) || [];

      const requireBodyProps = Reflect.getMetadata(
        MetadataKeys.vallidator, 
        target.prototype, 
        key
      ) || [];

      const vallidator = bodyValidators(requireBodyProps);

      if (path) {
        router[method](`${routePrefix}${path}`, ...middlewares, vallidator, routeHandler);
      }
    }
  };
}