import 'reflect-metadata'
import { Mehods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

function routerBinder(method: string) {
  return function(path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key)
      Reflect.defineMetadata(MetadataKeys.method, method, target, key)
    }
  }
}

export const get = routerBinder(Mehods.get);
export const post = routerBinder(Mehods.post);