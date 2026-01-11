import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import AbstractMovableState from '../../base/abstract-movable-state';
import { PlayerStates } from '../states';
import { GameObject } from '../../../../common/types';

class LiftState extends AbstractMovableState {
    constructor(gameObject: Player) {
        super(PlayerStates.LIFT, gameObject);
    }

    onEnter(args?: unknown[]) {
        const gameObjectPickedUp = args?.[0] as GameObject | undefined;

        this.gameObject.updateVelocity(true, 0);
        this.gameObject.updateVelocity(false, 0);

        const heldGameObjectComponent = (this.gameObject as any).objectHeldComponent;
        if (!heldGameObjectComponent) {
            this.stateMachine.setState(PlayerStates.IDLE);
            return;
        }
        heldGameObjectComponent._object = gameObjectPickedUp;
        (this.gameObject as any).objectHeldComponent._object = heldGameObjectComponent._object;

        if (gameObjectPickedUp?.body) {
            const body = gameObjectPickedUp.body as Phaser.Physics.Arcade.Body;
            body.enable = false;
        }
        gameObjectPickedUp?.setDepth(3).setOrigin(0.5, 0.5);

        this.gameObject.scene.sound.play('SFX_ITEM_PICKUP', { volume: 0.4 });
        if (DIRECTION.isMovingDown) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_DOWN,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingUp) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_UP,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingLeft) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_LEFT,
                    repeat: -1,
                },
                true,
            );
        } else if (DIRECTION.isMovingRight) {
            this.gameObject.play(
                {
                    key: PLAYER_ANIMATION_KEYS.PICKUP_RIGHT,
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
        this.stateMachine.setState(PlayerStates.IDLE_HOLDING, DIRECTION);
    }
}

export default LiftState;
