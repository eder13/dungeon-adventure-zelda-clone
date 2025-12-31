import { GameObject } from '../../common/types';
import BaseGameObject from './base-game-object-component';

class ThrowableObjectComponent extends BaseGameObject {
    callback: () => void;

    constructor(gameObject: GameObject, callback?: () => void) {
        super(gameObject);
        this.callback = callback ?? (() => {});
    }

    public drop() {
        this.callback();
    }

    public throw() {
        this.callback();
    }
}

export default ThrowableObjectComponent;
