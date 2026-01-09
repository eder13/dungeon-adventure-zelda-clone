import * as Phaser from 'phaser';

export const EVENT_BUS = new Phaser.Events.EventEmitter();

export const Events = {
    OPEN_CHEST: 'OPEN_CHEST',
    ENEMY_DEFEATED: 'ENEMY_DEFEATED',
} as const;
