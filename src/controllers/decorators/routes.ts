import 'reflect-metadata'
import { Mehods } from './Methods'

function routerBinder(method: string) {
  return function(path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', method, target, key)
    }
  }
}

export const get = routerBinder(Mehods.get);
export const post = routerBinder(Mehods.post);