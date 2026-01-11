import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import AbstractMovableState from '../../base/abstract-movable-state';
import { PlayerStates } from '../states';

class ThrowState extends AbstractMovableState {
    constructor(gameObject: Player) {
        super(PlayerStates.THROW, gameObject);
    }

    onEnter(args?: unknown[]) {
        this.gameObject.updateVelocity(true, 0);
        this.gameObject.updateVelocity(false, 0);

        // Lift Animation in reverse
        if (DIRECTION.isMovingDown) {
            this.gameObject.playReverse(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_DOWN,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingUp) {
            this.gameObject.playReverse(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_UP,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingLeft) {
            this.gameObject.playReverse(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_LEFT,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingRight) {
            this.gameObject.playReverse(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_RIGHT,
                    repeat: -1,
                },
                true,
            );
        }

        const heldGameObjectComponent = (this.gameObject as any).objectHeldComponent;

        if (!heldGameObjectComponent || !heldGameObjectComponent._object) {
            return;
        }

        const throwableObjectComponent = heldGameObjectComponent._object.throwableObjectComponent;

        if (throwableObjectComponent !== undefined) {
            throwableObjectComponent?.throw?.();
            return;
        }
        throwableObjectComponent?.drop?.();
    }

    onExit() {
        super.onExit();
        // Handle exiting the idle state
    }

    onUpdate(args?: unknown[]) {
        this.stateMachine.setState(PlayerStates.IDLE, DIRECTION);
    }
}

export default ThrowState;
