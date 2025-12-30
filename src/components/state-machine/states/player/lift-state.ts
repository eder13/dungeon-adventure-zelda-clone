import { PlayerAnimation } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import BasePlayerState from './base-player-state';
import { PlayerStates } from '../states';

class LiftState extends BasePlayerState {
    constructor(gameObject: Player) {
        super(PlayerStates.LIFT, gameObject);
    }

    onEnter(args?: unknown[]) {
        this.gameObject.updateVelocity(true, 0);
        this.gameObject.updateVelocity(false, 0);

        if (DIRECTION.isMovingDown) {
            this.gameObject.play(
                {
                    key: PlayerAnimation.PICKUP_DOWN,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingUp) {
            this.gameObject.play(
                {
                    key: PlayerAnimation.PICKUP_UP,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingLeft) {
            this.gameObject.play(
                {
                    key: PlayerAnimation.PICKUP_LEFT,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingRight) {
            this.gameObject.play(
                {
                    key: PlayerAnimation.PICKUP_RIGHT,
                    repeat: -1,
                },
                true,
            );
        }
    }

    onExit() {
        super.onExit();
        // Handle exiting the idle state
    }

    onUpdate(args?: unknown[]) {
        this.stateMachine.setState(PlayerStates.IDLE_HOLDING, DIRECTION);
    }
}

export default LiftState;
