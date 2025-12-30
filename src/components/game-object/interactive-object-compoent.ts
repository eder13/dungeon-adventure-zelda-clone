import { GameObject, InteractiveObjectType } from '../../common/types';
import BaseGameObject from './base-game-object-component';

class InteractiveObjectComponent extends BaseGameObject {
    _objectType: InteractiveObjectType;
    _callback: () => void;
    _canInteractCheck: () => boolean;

    constructor(
        game: GameObject,
        objectType: InteractiveObjectType,
        canInteractCheck: () => boolean,
        callback?: () => void,
    ) {
        super(game);
        this._objectType = objectType;
        this._callback = callback ?? (() => {});
        this._canInteractCheck = canInteractCheck;
    }

    get objectType(): InteractiveObjectType {
        return this._objectType;
    }

    public canInteract(): boolean {
        return this._canInteractCheck();
    }

    public interact(): void {
        this._callback();
    }
}

export default InteractiveObjectComponent;
