import * as Phaser from 'phaser';
import { Position } from '../../common/types';
import { ASSET_KEYS } from '../../common/assets';
import InteractiveObjectComponent from '../../components/game-object/interactive-object-compoent';
import { INTERACTIVE_OBJECT_TYPE } from '../../common/globals';

type PotConfig = {
    scene: Phaser.Scene;
    position: Position;
};

export class Pot extends Phaser.Physics.Arcade.Sprite {
    #position: Position;
    _interactiveObjectComponent: InteractiveObjectComponent;

    constructor(config: PotConfig) {
        super(config.scene, config.position.x, config.position.y, ASSET_KEYS.POT, 0);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0, 1).setImmovable(true);

        this.#position = config.position;

        // components
        this._interactiveObjectComponent = new InteractiveObjectComponent(
            this,
            INTERACTIVE_OBJECT_TYPE.PICKUP,
            () => true,
        );
    }
}
