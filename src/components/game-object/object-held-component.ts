import { GameObject } from '../../common/types';
import BaseGameObject from './base-game-object-component';

class ObjectHeldComponent extends BaseGameObject {
    _object: GameObject | undefined;

    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    get object(): GameObject | undefined {
        return this._object;
    }

    set object(object: GameObject) {
        this._object = object;
    }

    public drop() {
        this._object = undefined;
    }
}

export default ObjectHeldComponent;
