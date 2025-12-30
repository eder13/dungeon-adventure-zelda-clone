import { PlayerAnimation } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import BasePlayerState from './base-player-state';
import { PlayerStates } from '../states';

class MoveHoldingState extends BasePlayerState {
    constructor(gameObject: Player) {
        super(PlayerStates.MOVING_HOLDING, gameObject);
    }

    onExit() {
        super.onExit();
    }

    onUpdate(args?: unknown[]) {
        const controls = this.gameObject.controlsComponent.controls;

        if (controls.isActionKeyDown) {
            // TODO: Throw State
            this.gameObject.stateMachine.setState(PlayerStates.IDLE);
            return;
        }

        // =====================
        // VERTICAL MOVEMENT
        // =====================
        if (controls.isDownDown) {
            DIRECTION.isMovingDown = true;
            DIRECTION.isMovingUp = false;
            DIRECTION.isMovingLeft = false;
            DIRECTION.isMovingRight = false;

            this.gameObject.play({ key: PlayerAnimation.PICKUP_WALKING_DOWN, repeat: -1 }, true);

            this.gameObject.updateVelocity(false, 1);
        } else if (controls.isUpDown) {
            DIRECTION.isMovingDown = false;
            DIRECTION.isMovingUp = true;
            DIRECTION.isMovingLeft = false;
            DIRECTION.isMovingRight = false;

            this.gameObject.play({ key: PlayerAnimation.PICKUP_WALKING_UP, repeat: -1 }, true);

            this.gameObject.updateVelocity(false, -1);
        } else {
            this.gameObject.updateVelocity(false, 0);
        }

        const isMovingVertically = controls.isUpDown || controls.isDownDown;

        // =====================
        // HORIZONTAL MOVEMENT
        // =====================
        if (controls.isLeftDown) {
            if (controls.isUpDown) DIRECTION.isMovingUpLeft = true;
            if (controls.isDownDown) DIRECTION.isMovingDownLeft = true;

            DIRECTION.isMovingLeft = true;
            DIRECTION.isMovingRight = false;
            DIRECTION.isMovingUpRight = false;
            DIRECTION.isMovingDownRight = false;

            if (!isMovingVertically) {
                DIRECTION.isMovingUp = false;
                DIRECTION.isMovingDown = false;

                this.gameObject.play({ key: PlayerAnimation.PICKUP_WALKING_LEFT, repeat: -1 }, true);
            }

            this.gameObject.updateVelocity(true, -1);
        } else if (controls.isRightDown) {
            if (controls.isUpDown) DIRECTION.isMovingUpRight = true;
            if (controls.isDownDown) DIRECTION.isMovingDownRight = true;

            DIRECTION.isMovingRight = true;
            DIRECTION.isMovingLeft = false;
            DIRECTION.isMovingUpLeft = false;
            DIRECTION.isMovingDownLeft = false;

            if (!isMovingVertically) {
                DIRECTION.isMovingUp = false;
                DIRECTION.isMovingDown = false;

                this.gameObject.play({ key: PlayerAnimation.PICKUP_WALKING_RIGHT, repeat: -1 }, true);
            }

            this.gameObject.updateVelocity(true, 1);
        } else {
            this.gameObject.updateVelocity(true, 0);
        }

        // =====================
        // NO INPUT → STOP
        // =====================
        if (!controls.isDownDown && !controls.isUpDown && !controls.isLeftDown && !controls.isRightDown) {
            return;
        }

        if (
            !this.gameObject.controls.isDownDown &&
            !this.gameObject.controls.isUpDown &&
            !this.gameObject.controls.isLeftDown &&
            !this.gameObject.controls.isRightDown
        ) {
            this.stateMachine.setState(PlayerStates.IDLE_HOLDING, DIRECTION);
        }
    }
}

export default MoveHoldingState;
