type KeyTypes = 'standard' | 'boss';

class InventoryManager {
    private static instance: InventoryManager;
    key: number;
    _hasBossKey: boolean;

    private constructor() {
        // Initialize inventory
        this.key = 0;
        this._hasBossKey = false;
    }

    public addKey(keyType: KeyTypes): void {
        if (keyType === 'boss') {
            this._hasBossKey = true;
        }

        if (keyType === 'standard') {
            this.key++;
        }
    }

    hasKey(): boolean {
        return this.key > 0;
    }

    public useKey(): boolean {
        if (this.hasKey()) {
            this.key--;
            return true;
        }
        return false;
    }

    public hasBossKey(): boolean {
        return this._hasBossKey;
    }

    static getInstance(): InventoryManager {
        if (!InventoryManager.instance) {
            InventoryManager.instance = new InventoryManager();
        }
        return InventoryManager.instance;
    }

    public reset() {
        this.key = 0;
        this._hasBossKey = false;
    }
}

export default InventoryManager;
