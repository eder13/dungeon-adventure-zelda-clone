export enum PlayerStates {
    IDLE = 'IDLE',
    RUNNING = 'RUNNING',
    HURT = 'HURT',
    DEATH = 'DEATH',
    LIFT = 'LIFT',
    OPEN_CHEST = 'OPEN_CHEST',
    IDLE_HOLDING = 'IDLE_HOLDING',
    MOVING_HOLDING = 'MOVING_HOLDING',
    THROW = 'THROW',
    ATTACK = 'ATTACK',
}

export enum SpiderStates {
    IDLE = 'IDLE',
    RUNNING = 'RUNNING',
    HURT = 'HURT',
    DEATH = 'DEATH',
}

export enum BlobStates {
    IDLE = 'IDLE',
    RUNNING = 'RUNNING',
    HURT = 'HURT',
    DEATH = 'DEATH',
}

export enum SawStates {
    RUNNING = 'RUNNING',
    BOUNCE_MOVE = 'BOUNCE_MOVE',
}

export enum FireStates {
    BURNING = 'BURNING',
}

export enum SpikeStates {
    IDLE = 'IDLE',
}

export enum BossStates {
    IDLE = 'IDLE',
    PRE_ATTACK = 'PRE_ATTACK',
    ATTACK = 'ATTACK',
    RANDOM = 'RANDOM',
    HURT = 'HURT',
    DEATH = 'DEATH',
}
