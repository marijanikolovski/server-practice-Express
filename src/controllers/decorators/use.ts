import { RequestHandler } from 'express'
import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'

export function use(midleware: RequestHandler) {
  return function(target: any, key:string, desc: PropertyDescriptor) {
    const middlewares = Reflect.getMetadata(
      MetadataKeys.middleware,
      target,
      key
    ) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware, 
      [...middlewares, midleware], 
      target, 
      key
    );
  }
}