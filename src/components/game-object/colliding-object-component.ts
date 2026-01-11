import { GameObject } from '../../common/types';
import BaseGameObject from './base-game-object-component';

class CollidingObjectComponent extends BaseGameObject {
    _objects: GameObject[];

    constructor(game: GameObject) {
        super(game);
        this._objects = [];
    }

    get objects(): GameObject[] {
        return this._objects;
    }

    public addObject(object: GameObject): void {
        this._objects.push(object);
    }

    reset() {
        this._objects = [];
    }
}

export default CollidingObjectComponent;
