import * as Phaser from 'phaser';
import { Position } from '../../common/types';
import { ASSET_KEYS } from '../../common/assets';
import InteractiveObjectComponent from '../../components/game-object/interactive-object-compoent';
import { INTERACTIVE_OBJECT_TYPE } from '../../common/globals';
import ThrowableObjectComponent from '../../components/game-object/throwable-object-component';

type PotConfig = {
    scene: Phaser.Scene;
    position: Position;
};

export class Pot extends Phaser.Physics.Arcade.Sprite {
    #position: Position;
    _interactiveObjectComponent: InteractiveObjectComponent;
    public throwableObjectComponent: ThrowableObjectComponent;

    constructor(config: PotConfig) {
        super(config.scene, config.position.x, config.position.y, ASSET_KEYS.POT, 0);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0, 1).setImmovable(true); // setImmovable wont let the object move once collided with

        this.#position = config.position;

        // components
        this._interactiveObjectComponent = new InteractiveObjectComponent(
            this,
            INTERACTIVE_OBJECT_TYPE.PICKUP,
            () => true,
            () => {
                console.log('#####** Interacted with Pot');
            },
        );

        this.throwableObjectComponent = new ThrowableObjectComponent(this, () => {
            this.break();
        });
    }

    break() {
        (this.body as Phaser.Physics.Arcade.Body).enable = false;
        this.setTexture(ASSET_KEYS.POT_BREAK, 0).play(ASSET_KEYS.POT_BREAK);
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE + ASSET_KEYS.POT_BREAK, () => {
            // hide the pot
            console.log('+++++ hide');
        });
    }
}
