import { PLAYER_ANIMATION_KEYS } from '../../../../common/assets';
import { ATTACK_DIRECTION, BLOCK_ATTACK_MOVEMENT, DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import AbstractMovableState from '../../base/abstract-movable-state';
import { PlayerStates } from '../states';
import { DIRECTION as DIRECTION_HIT } from '../../../../common/tiled/types';

class AttackState extends AbstractMovableState {
    private attackStarted = false;
    private weapon!: Phaser.GameObjects.Sprite;
    private weaponCollider?: Phaser.Physics.Arcade.Collider;

    private ensureWeapon() {
        const player: any = this.gameObject;
        if (player.weapon) {
            this.weapon = player.weapon;
            return;
        }

        this.weapon = this.gameObject.scene.add
            .sprite(0, 0, 'WEAPON_KEY', 0)
            .setOrigin(0.5, 0.5)
            .setDepth(this.gameObject.depth + 1)
            .setVisible(false);

        this.gameObject.scene.physics.add.existing(this.weapon);
        const wBody = this.weapon.body as Phaser.Physics.Arcade.Body;
        if (wBody) {
            wBody.setEnable(false);
            wBody.setImmovable(true);
            wBody.setAllowGravity(false);
        }

        player.weapon = this.weapon;
    }

    constructor(gameObject: Player) {
        super(PlayerStates.ATTACK, gameObject);
    }

    onExit() {
        super.onExit();
    }

    onEnter(args?: unknown[]) {
        this.ensureWeapon();

        this.attackStarted = true;
        this.gameObject.invulnerableComponent.invulnerable = true;

        this.gameObject.updateVelocity(true, 0);
        this.gameObject.updateVelocity(false, 0);

        // offsets for player animation and overlap of player - exchange sprites and make sure the overlap
        const OFFSETS: Record<string, { dx: number; dy: number; anim: string; flip?: boolean; direction: string }> = {
            down: { dx: -3, dy: 5, anim: PLAYER_ANIMATION_KEYS.ATTACK_DOWN, direction: DIRECTION_HIT.DOWN },
            up: { dx: 1, dy: -1, anim: PLAYER_ANIMATION_KEYS.ATTACK_UP, direction: DIRECTION_HIT.UP },
            left: {
                dx: -5,
                dy: 4,
                anim: PLAYER_ANIMATION_KEYS.ATTACK_LEFT,
                flip: false,
                direction: DIRECTION_HIT.LEFT,
            },
            right: { dx: 5, dy: 2, anim: PLAYER_ANIMATION_KEYS.ATTACK_RIGHT, direction: DIRECTION_HIT.RIGHT },
        };

        let key: { dx: number; dy: number; anim: string; flip?: boolean; direction: string } | undefined;

        if (DIRECTION.isMovingUp) key = OFFSETS.up;
        else if (DIRECTION.isMovingLeft) key = OFFSETS.left;
        else if (DIRECTION.isMovingRight) key = OFFSETS.right;
        else if (DIRECTION.isMovingDown) key = OFFSETS.down;

        if (key) {
            if (key.direction === DIRECTION_HIT.DOWN) {
                ATTACK_DIRECTION.DOWN = true;
                ATTACK_DIRECTION.LEFT = false;
                ATTACK_DIRECTION.RIGHT = false;
                ATTACK_DIRECTION.UP = false;
            } else if (key.direction === DIRECTION_HIT.UP) {
                ATTACK_DIRECTION.UP = true;
                ATTACK_DIRECTION.LEFT = false;
                ATTACK_DIRECTION.RIGHT = false;
                ATTACK_DIRECTION.DOWN = false;
            } else if (key.direction === DIRECTION_HIT.LEFT) {
                ATTACK_DIRECTION.LEFT = true;
                ATTACK_DIRECTION.UP = false;
                ATTACK_DIRECTION.RIGHT = false;
                ATTACK_DIRECTION.DOWN = false;
            } else if (key.direction === DIRECTION_HIT.RIGHT) {
                ATTACK_DIRECTION.RIGHT = true;
                ATTACK_DIRECTION.UP = false;
                ATTACK_DIRECTION.LEFT = false;
                ATTACK_DIRECTION.DOWN = false;
            }
        }

        // position weapon sprites relative to gameobject
        this.weapon.setPosition(this.gameObject.x + (key?.dx ?? 0), this.gameObject.y + (key?.dy ?? 0));
        this.weapon.setFlipX(!!key?.flip);
        this.weapon.setVisible(true);

        // hide player visuals but keep physics body active
        const player: any = this.gameObject;
        const hadAnims = !!player.anims;

        // hide normal player sprite and pause animations
        if (hadAnims) player.anims.pause();
        player.setVisible(false);
        const wBody = this.weapon.body as Phaser.Physics.Arcade.Body | undefined;
        if (wBody) wBody.setEnable(true);

        // attack, collide with enemies
        if (!this.weaponCollider) {
            const enemies = (this.gameObject.scene as any).enemyGroup as Phaser.GameObjects.Group | undefined;
            if (enemies) {
                this.weaponCollider = this.gameObject.scene.physics.add.overlap(this.weapon, enemies, (_, e) => {
                    if (!(e as any).invulnerableComponent?.isInvulnerable) {
                        (e as any).hit?.(1, ATTACK_DIRECTION);
                    }
                });
            }
        }

        this.weapon.play({ key: key?.anim ?? '', repeat: 0 }, true);
        this.gameObject.scene?.sound.play('SFX_SWORD_ATTACK', { seek: 1.75 });

        this.weapon.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (animation: Phaser.Animations.Animation) => {
            if (
                animation.key === PLAYER_ANIMATION_KEYS.ATTACK_DOWN ||
                animation.key === PLAYER_ANIMATION_KEYS.ATTACK_UP ||
                animation.key === PLAYER_ANIMATION_KEYS.ATTACK_LEFT ||
                animation.key === PLAYER_ANIMATION_KEYS.ATTACK_RIGHT
            ) {
                BLOCK_ATTACK_MOVEMENT.blockAttackMovement = false;
            }
        });

        // hide + disable body wenn Animation fertig
        this.weapon.once(Phaser.Animations.Events.ANIMATION_COMPLETE, (anim: Phaser.Animations.Animation) => {
            if (anim.key !== key?.anim) return;
            this.weapon.setVisible(false);
            if (wBody) {
                wBody.setVelocity(0, 0);
                wBody.setEnable(false);
            }
            // restore player visuals & animations
            player.setVisible(true);
            if (hadAnims) player.anims.resume();

            this.gameObject.invulnerableComponent.invulnerable = false;

            this.stateMachine.setState(PlayerStates.IDLE, DIRECTION);
        });
    }
}

export default AttackState;
