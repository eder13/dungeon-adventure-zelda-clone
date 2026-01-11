import { BOSS_RANDOM_DIRECTION_DELAY, BOSS_RANDOM_STATE_FINISHED_DELAY } from '../../../../common/globals';
import AbstractMovableState from '../../base/abstract-movable-state';
import Boss from '../../../../game-objects/enemies/boss';
import { BossStates } from '../states';

class RandomStateBoss extends AbstractMovableState {
    possibleRandomPositions: Phaser.Math.Vector2[];

    constructor(gameObject: Boss, possibleRandomPositions: Phaser.Math.Vector2[]) {
        super(BossStates.RANDOM, gameObject);
        this.possibleRandomPositions = possibleRandomPositions;
    }

    onEnter(args?: unknown[]) {
        (this.gameObject.invulnerableComponent as any).isInvulnerable = true;
        if (this.gameObject.body?.enable) this.gameObject.body.enable = false;

        const event = this.gameObject.scene.time.addEvent({
            delay: BOSS_RANDOM_DIRECTION_DELAY,
            callback: () => {
                (this.gameObject.invulnerableComponent as any).isInvulnerable = false;
                if (event.getOverallProgress() === 1) {
                    this.handleRandomMovementFinished();
                    return;
                }

                const location = this.possibleRandomPositions[event.repeatCount % this.possibleRandomPositions.length];
                this.gameObject.setPosition(location.x, location.y);
            },
            repeat: this.possibleRandomPositions.length * 3 - 1,
        });
    }

    handleRandomMovementFinished(): void {
        this.gameObject.visible = false;
        this.gameObject.scene.time.delayedCall(BOSS_RANDOM_STATE_FINISHED_DELAY, () => {
            const randomLocation = Phaser.Utils.Array.GetRandom(this.possibleRandomPositions);
            this.gameObject.setPosition(randomLocation.x, randomLocation.y);
            this.gameObject.visible = true;
            (this.gameObject.invulnerableComponent as any).isInvulnerable = false;
            if (this.gameObject.body) this.gameObject.body.enable = true;

            this.stateMachine.setState(BossStates.ATTACK);
        });
    }

    onUpdate(args?: unknown[]) {}
}

export default RandomStateBoss;
