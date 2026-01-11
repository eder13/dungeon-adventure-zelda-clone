import { FIRE_ANIMATION_KEYS } from '../../../../common/assets';
import { FireStates } from '../states';
import Fire from '../../../../game-objects/objects/fire';
import AbstractStaticState from '../../base/abstract-static-state';

class BurningStateFire extends AbstractStaticState {
    constructor(gameObject: Fire) {
        super(FireStates.BURNING, gameObject);
    }

    onEnter(args?: unknown[]) {
        this.gameObject.play(
            {
                key: FIRE_ANIMATION_KEYS.FIRE_ANIMATION,
                repeat: -1,
            },
            true,
        );
    }

    onExit() {
        super.onExit();
    }

    onUpdate(args?: unknown[]) {}
}

export default BurningStateFire;
