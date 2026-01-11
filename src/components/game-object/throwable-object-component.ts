import { DIRECTION, THROW_ITEM_DELAY_BEFORE_CALLBACK, THROW_SPEED } from '../../common/globals';
import { GameObject } from '../../common/types';
import { isCustomGameObject } from '../../common/utils';
import BaseGameObject from './base-game-object-component';

class ThrowableObjectComponent extends BaseGameObject {
    callback: () => void;

    constructor(gameObject: GameObject, callback?: () => void) {
        super(gameObject);
        this.callback = callback ?? (() => {});
    }

    public drop() {
        this.callback();
    }

    public throw() {
        if (!isCustomGameObject(this.gameObject)) {
            this.callback();
            return;
        }

        const body = this.gameObject.body as Phaser.Physics.Arcade.Body;

        body.velocity.x = 0;
        body.velocity.y = 0;

        // depending on direction that we phase -> throw
        if (DIRECTION.isMovingDown) {
            (body as Phaser.Physics.Arcade.Body).enable = false;
            this.gameObject.active = false;
            this.gameObject.visible = false;

            body.checkCollision.none = true;

            this.gameObject.scene.time.delayedCall(50, () => {
                body.checkCollision.none = false;
                this.gameObject.active = true;
                this.gameObject.visible = true;
            });

            body.velocity.y = THROW_SPEED;
        } else if (DIRECTION.isMovingUp) {
            body.velocity.y = -THROW_SPEED;
        } else if (DIRECTION.isMovingLeft) {
            body.velocity.x = -THROW_SPEED;
        } else if (DIRECTION.isMovingRight) {
            body.velocity.x = THROW_SPEED;
        }

        this.gameObject.enableObject();

        setTimeout(() => {
            body.velocity.x = 0;
            body.velocity.y = 0;
            this.callback();
        }, THROW_ITEM_DELAY_BEFORE_CALLBACK);
    }
}

export default ThrowableObjectComponent;
