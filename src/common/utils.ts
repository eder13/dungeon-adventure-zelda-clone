import { CustomGameObject } from './types';

export function exhaustiveGuard(_value: never): never {
    throw new Error(`Error! Reached forbidden guard function with unexpected value: ${JSON.stringify(_value)}`);
}

export function isCustomGameObject(object: any): object is CustomGameObject {
    return object && typeof object.enableObject === 'function' && typeof object.disableObject === 'function';
}
