export const ASSET_PACK_KEYS = {
    MAIN: 'MAIN',
} as const;

export const ASSET_KEYS = {
    PLAYER: 'PLAYER',
    PLAYER_DEATH: 'PLAYER_DEATH',
    PLAYER_ATTACK: 'PLAYER_ATTACK',
    POT: 'POT',
    SMALL_KEY: 'SMALL_KEY',
    BOSS_KEY: 'BOSS_KEY',
    BOSS: 'BOSS',
    POT_BREAK: 'POT_BREAK',
    SPIDER: 'SPIDER',
    SPIDER_RED: 'SPIDER_RED',
    SPIKE: 'SPIKE',
    BLOB: 'BLOB',
    SAW: 'SAW',
    FIRE: 'FIRE',
    FIRE_IDLE: 'FIRE_IDLE',
    DUNGEON_1_BACKGROUND: 'DUNGEON_1_BACKGROUND',
    DUNGEON_1_FOREGROUND: 'DUNGEON_1_FOREGROUND',
    DUNGEON_1_LEVEL: 'DUNGEON_1_LEVEL',
    COLLISION: 'COLLISION',
    DUNGEON_OBJECTS: 'DUNGEON_OBJECTS',
    ENEMY_DEATH: 'ENEMY_DEATH',
    UI_DIALOG: 'UI_DIALOG',
    UI_CURSOR: 'UI_CURSOR',
    UI_HEARTBARS: 'UI_HEARTBARS',
} as const;

export const PLAYER_ANIMATION_KEYS = {
    IDLE_DOWN: 'idle_down',
    WALKING_DOWN: 'walking_down',
    PICKUP_DOWN: 'pickup_down',
    PICKUP_DOWN_IDLE: 'pickup_down_idle',
    PLAYER_HURT: 'hurt',
    PLAYER_DEATH: 'player_dead',
    PICKUP_WALKING_DOWN: 'pickup_down_walking',
    IDLE_RIGHT: 'idle_right',
    WALKING_RIGHT: 'walking_right',
    PICKUP_RIGHT: 'pickup_right',
    PICKUP_RIGHT_IDLE: 'pickup_right_idle',
    PICKUP_WALKING_RIGHT: 'pickup_right_walking',
    IDLE_UP: 'idle_up',
    WALKING_UP: 'walking_up',
    PICKUP_UP: 'pickup_up',
    PICKUP_UP_IDLE: 'pickup_up_idle',
    PICKUP_WALKING_UP: 'pickup_walking_up',
    IDLE_LEFT: 'idle_left',
    WALKING_LEFT: 'walking_left',
    PICKUP_LEFT: 'pickup_left',
    PICKUP_LEFT_IDLE: 'pickup_left_idle',
    PICKUP_WALKING_LEFT: 'pickup_left_walking',
    ATTACK_LEFT: 'attack_left',
    ATTACK_RIGHT: 'attack_right',
    ATTACK_UP: 'attack_up',
    ATTACK_DOWN: 'attack_down',
};

export const SAW_ANIMATION_KEYS = {
    WALK: 'saw_blade',
};

export const FIRE_ANIMATION_KEYS = {
    FIRE_ANIMATION: 'fire_animation',
};

export const SPIKE_ANIMATION_KEYS = {
    IDLE: 'idle_spike_animation',
};

export const BLOB_ANIMATION_KEYS = {
    MOVE_UP: 'move_up',
    MOVE_DOWN: 'move_down',
    MOVE_LEFT: 'move_left',
    MOVE_RIGHT: 'move_right',
    DEATH: ASSET_KEYS.ENEMY_DEATH,
};

export const SPIDER_RED_ANIMATION_KEYS = {
    IDLE_DOWN: 'spider_idle_down',
    IDLE_RIGHT: 'spider_idle_right',
    IDLE_UP: 'spider_idle_up',
    IDLE_LEFT: 'spider_idle_left',
    DEATH: ASSET_KEYS.ENEMY_DEATH,
} as const;

export const BOSS_ANIMATION_KEYS = {
    DEATH: ASSET_KEYS.ENEMY_DEATH,
} as const;

export const CHEST_FRAME_KEYS = {
    BIG_CHEST_CLOSED: 'big_chest_closed.png',
    SMALL_CHEST_CLOSED: 'chest_closed.png',
    BIG_CHEST_OPEN: 'big_chest_open.png',
    SMALL_CHEST_OPEN: 'chest_open.png',
} as const;

export const DOOR_FRAME_KEYS = {
    TRAP_LEFT: 'trap_left.png',
    TRAP_RIGHT: 'trap_right.png',
    TRAP_UP: 'trap_up.png',
    TRAP_DOWN: 'trap_down.png',
    BOSS_LEFT: 'boss_left.png',
    BOSS_RIGHT: 'boss_right.png',
    BOSS_UP: 'boss_up.png',
    BOSS_DOWN: 'boss_down.png',
    LOCK_LEFT: 'lock_left.png',
    LOCK_RIGHT: 'lock_right.png',
    LOCK_UP: 'lock_up.png',
    LOCK_DOWN: 'lock_down.png',
} as const;

export const BUTTON_FRAME_KEYS = {
    FLOOR_SWITCH: 'floor_switch.png',
    PLATE_SWITCH: 'plate_switch.png',
} as const;
