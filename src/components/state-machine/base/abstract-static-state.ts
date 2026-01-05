import Fire from '../../../game-objects/objects/fire';
import StateMachine, { State } from '../state-machine';

class AbstractStaticState implements State {
    stateMachine!: StateMachine;
    name: string;
    gameObject: Fire;

    constructor(name: string, gameObject: Fire) {
        this.name = name;
        this.gameObject = gameObject;
    }

    get getName() {
        return this.name;
    }

    set setStateMachine(stateMachine: StateMachine) {
        this.stateMachine = stateMachine;
    }

    onEnter(args) {
        // Handle entering the state
    }

    onExit() {
        // Handle exiting the state
    }

    onUpdate() {
        // Handle updating the state
    }
}

export default AbstractStaticState;
