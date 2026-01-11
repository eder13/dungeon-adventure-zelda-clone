import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import AbstractMovableState from '../../base/abstract-movable-state';
import { PlayerStates } from '../states';

class IdleHoldingState extends AbstractMovableState {
    constructor(gameObject: Player) {
        super(PlayerStates.IDLE_HOLDING, gameObject);
    }

    onEnter(args?: unknown[]) {
        DIRECTION.isPlayerMoving = false;

        if (DIRECTION.isMovingDown) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_DOWN_IDLE,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingUp) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_UP_IDLE,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingLeft) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_LEFT_IDLE,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingRight) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_RIGHT_IDLE,
                    repeat: -1,
                },
                true,
            );
        }
    }

    onExit() {
        super.onExit();
    }

    onUpdate(args?: unknown[]) {
        if (this.gameObject.controls.isActionKeyDown) {
            this.gameObject.stateMachine.setState(PlayerStates.THROW);
            return;
        }

        this.stateMachine.setState(PlayerStates.MOVING_HOLDING, DIRECTION);
    }
}

export default IdleHoldingState;
