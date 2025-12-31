import { PlayerAnimation } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import BasePlayerState from './base-player-state';
import { PlayerStates } from '../states';

class ThrowState extends BasePlayerState {
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
                    key: PlayerAnimation.PICKUP_DOWN,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingUp) {
            this.gameObject.playReverse(
                {
                    key: PlayerAnimation.PICKUP_UP,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingLeft) {
            this.gameObject.playReverse(
                {
                    key: PlayerAnimation.PICKUP_LEFT,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingRight) {
            this.gameObject.playReverse(
                {
                    key: PlayerAnimation.PICKUP_RIGHT,
                    repeat: -1,
                },
                true,
            );
        }

        const heldGameObjectComponent = (this.gameObject as any).objectHeldComponent;

        console.log('#####** this.gameObjects', this.gameObject);

        if (!heldGameObjectComponent || !heldGameObjectComponent._object) {
            return;
        }
        const throwableObjectComponent = heldGameObjectComponent.throwableObjectComponent;

        console.log('###### ++++++', heldGameObjectComponent);

        if (throwableObjectComponent !== undefined) {
            throwableObjectComponent.throw();
            return;
        }
        heldGameObjectComponent.drop();
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
