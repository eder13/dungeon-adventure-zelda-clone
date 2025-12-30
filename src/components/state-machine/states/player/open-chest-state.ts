import { PlayerAnimation } from '../../../../common/assets';
import { DIRECTION } from '../../../../common/globals';
import Player from '../../../../game-objects/player/player';
import BasePlayerState from './base-player-state';
import { PlayerStates } from '../states';
import { Chest } from '../../../../game-objects/objects/chest';

class OpenChestState extends BasePlayerState {
    constructor(gameObject: Player) {
        super(PlayerStates.OPEN_CHEST, gameObject);
    }

    onUpdate(args?: unknown[]) {
        const chest = args?.[0] as Chest;
        console.log('#####**  const chest = args?.[0] as Chest;', chest);

        this.gameObject.stateMachine.setState(PlayerStates.IDLE, DIRECTION);
    }

    onExit() {
        super.onExit();
        // Handle exiting the idle state
    }
}

export default OpenChestState;
