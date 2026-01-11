import * as Phaser from 'phaser';
import { SCENE_KEYS } from './scene-keys';
import KeyboardInput from '../components/input-component/keyboard';
import { ASSET_KEYS } from '../common/assets';

export type LeaderboardEntry = { name: string; time: string };

export class LeaderboardScene extends Phaser.Scene {
    leaderboardData!: LeaderboardEntry[];
    transitionFromScene!: keyof typeof SCENE_KEYS;
    cursor!: Phaser.GameObjects.Image;
    keyboardInput!: KeyboardInput;

    constructor() {
        super({ key: SCENE_KEYS.LEADERBOARD_SCENE });
    }

    public init(data: { lastScene: keyof typeof SCENE_KEYS }): void {
        this.transitionFromScene = data.lastScene;
    }

    create() {
        // ensure Phaser keyboard is enabled (e.g. re-enable after DOM input in congratulations scene)
        if (this.input && this.input.keyboard) {
            this.input.keyboard.enabled = true;
        }
        // remove focus from any HTML input so key events reach Phaser (safe in browsers)
        try {
            if (typeof document !== 'undefined' && document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        } catch (e) {
            /* ignore in non-browser env */
        }

        // Capture Enter on window in capture phase to ensure it fires even if some DOM input still exists
        const onEnter = (e: KeyboardEvent) => {
            if (e.key !== 'Enter') return;
            // prevent default/stop propagation so other listeners (e.g. lingering DOM inputs) don't swallow it
            e.preventDefault();
            e.stopPropagation();
            if (this.transitionFromScene !== SCENE_KEYS.CONGRATULATIONS) {
                this.scene.start(SCENE_KEYS.START_SCREEN);
            } else {
                window.location.reload();
            }
        };
        // use capture=true so we get the event before it reaches focused inputs
        window.addEventListener('keydown', onEnter, true);
        // remove the listener when the scene shuts down
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            window.removeEventListener('keydown', onEnter, true);
        });

        if (this.input.keyboard) {
            this.keyboardInput = new KeyboardInput(this.input.keyboard);
        } else {
            // fallback stub to avoid crashes when keyboard manager isn't available
            this.keyboardInput = { isEnterKeyDown: false } as unknown as KeyboardInput;
        }

        (async () => {
            // Fetch leaderboard data from the server
            const response = await fetch('/api/leaderboard');

            if (!response.ok) {
                console.error('Failed to fetch leaderboard data');
                //return;
            }

            const data = await response.json();
            this.leaderboardData = data;

            this.add
                .text(this.scale.width / 2, 32, 'Leaderboard', {
                    fontSize: '32px',
                    align: 'center',
                })
                .setOrigin(0.5);

            this.add
                .text(this.scale.width / 2, 64, 'Top 5 Players', {
                    fontSize: '16px',
                    align: 'center',
                })
                .setOrigin(0.5);

            this.leaderboardData.forEach((entry, index) => {
                this.add
                    .text(this.scale.width / 2, 100 + index * 32, `Name: ${entry.name}        Time: ${entry.time}`, {
                        fontSize: '16px',
                        align: 'center',
                    })
                    .setOrigin(0.5);
            });

            if (this.transitionFromScene === SCENE_KEYS.CONGRATULATIONS) {
                this.showTextAfterCongratulationsScene();
            } else {
                this.showTextAfterStartScene();
            }
        })();
    }

    private showTextAfterCongratulationsScene() {
        this.cursor = this.add.image(230, 300, ASSET_KEYS.UI_CURSOR).setOrigin(0.5);
        this.add
            .text(this.scale.width / 2, 300, 'Restart Game', {
                fontSize: '16px',
                align: 'center',
            })
            .setOrigin(0.5);
    }

    private showTextAfterStartScene() {
        this.cursor = this.add.image(270, 300, ASSET_KEYS.UI_CURSOR).setOrigin(0.5);
        this.add
            .text(this.scale.width / 2, 300, 'Back', {
                fontSize: '16px',
                align: 'center',
            })
            .setOrigin(0.5);
    }

    update(): void {
        if (this.keyboardInput?.isEnterKeyDown && this.transitionFromScene !== SCENE_KEYS.CONGRATULATIONS) {
            this.scene.start(SCENE_KEYS.START_SCREEN);
        } else if (this.keyboardInput?.isEnterKeyDown) {
            window.location.reload();
        }
    }
}
