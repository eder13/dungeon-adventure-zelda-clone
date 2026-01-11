import { DELAYED_PUSH_BACK_HURT_RESET } from '../../../../common/globals';
import AbstractMovableState from '../../base/abstract-movable-state';
import Boss from '../../../../game-objects/enemies/boss';
import { BossStates } from '../states';

class IdleStateBoss extends AbstractMovableState {
    constructor(gameObject: Boss) {
        super(BossStates.IDLE, gameObject);
    }

    onEnter(args?: unknown[]) {
        const body = this.gameObject.body as Phaser.Physics.Arcade.Body;
        body.velocity.x = 0;
        body.velocity.y = 0;

        // after the push back, wait a certain amount if time before reseting velocity
        this.gameObject.scene.time.delayedCall(DELAYED_PUSH_BACK_HURT_RESET, () => {
            body.velocity.x = 0;
            body.velocity.y = 0;
        });
    }

    onExit() {
        super.onExit();
    }

    onUpdate(args?: unknown[]) {}
}

export default IdleStateBoss;
