import { PlayerAnimation, SPIDER_ANIMATION_KEYS } from '../../../../common/assets';
import { ATTACK_DIRECTION, DELAYED_PUSH_BACK_HURT_RESET } from '../../../../common/globals';
import AbstractMovableState from '../../base/abstract-movable-state';
import { Direction, DIRECTION as DIRECTION_HIT } from '../../../../common/tiled/types';
import Boss from '../../../../game-objects/enemies/boss';
import { BossStates } from '../states';
import { GameScene } from '../../../../scenes/game-scene';

class AttackStateBoss extends AbstractMovableState {
    private followTimer?: Phaser.Time.TimerEvent;
    private isFloatingToTarget = false;

    constructor(gameObject: Boss) {
        super(BossStates.ATTACK, gameObject);
    }

    onEnter(args?: unknown[]) {
        const targetEnemy = (this.gameObject.scene as GameScene).player;
        this.floatToPlayerPhysics(targetEnemy);
    }

    onUpdate(args?: unknown[]) {}

    // Physics-basierte Variante: verfolgt den Player dynamisch
    public floatToPlayerPhysics(target: Phaser.GameObjects.Sprite, speed = 100, stopDistance = 20) {
        if (!this.gameObject.scene || !this.gameObject.body) return;
        const body = this.gameObject.body as Phaser.Physics.Arcade.Body;

        this.isFloatingToTarget = true;
        body.setAllowGravity(false); // falls nötig
        body.setImmovable(false);

        // Start velocity einmal; wir nutzen einen Timer, um in Bewegung zu bleiben und Abstand zu prüfen
        this.gameObject.scene.physics.moveToObject(this.gameObject, target, speed);

        // regelmäßige Prüfung, ob wir nahe genug sind; speichere Timer für späteres Stoppen
        this.followTimer = this.gameObject.scene.time.addEvent({
            delay: 50,
            loop: true,
            callback: () => {
                if (!this.isFloatingToTarget) return;
                const dx = target.x - this.gameObject.x;
                const dy = target.y - this.gameObject.y;
                const dist = Math.hypot(dx, dy);

                // optional: aktualisiere Velocity, damit beweglicher Target verfolgt wird
                const vx = (dx / dist) * speed || 0;
                const vy = (dy / dist) * speed || 0;
                body.setVelocity(vx, vy);

                if (dist <= stopDistance) {
                    // reached target -> stop and attack
                    body.setVelocity(0, 0);
                    this.isFloatingToTarget = false;
                    this.followTimer?.remove(false);
                    this.followTimer = undefined;
                    this.onReachPlayer(target);
                }
            },
        });
    }

    public stopFloating() {
        this.isFloatingToTarget = false;
        if (this.followTimer) {
            this.followTimer.remove(false);
            this.followTimer = undefined;
        }
        const body = this.gameObject.body as Phaser.Physics.Arcade.Body | undefined;
        if (body) {
            body.setVelocity(0, 0);
            body.checkCollision.none = false;
        }
    }

    // gemeinsamer Attack-Callback
    private onReachPlayer(target: Phaser.GameObjects.Sprite) {
        // Beispiel: löse Angriff/Schaden aus
        // prüfe nochmal Abstand / Sichtlinie falls nötig
        (target as any).hit?.(1);

        this.gameObject.stateMachine.setState(BossStates.RANDOM);
    }
}

export default AttackStateBoss;
