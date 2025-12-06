class DiceController {
    private static instance: DiceController;
    private box: any; // DiceBox instance
    private isInitialized = false;
    private pendingRolls: Array<{ notation: string | string[]; resolve: (value: any) => void }> = [];

    private sound: HTMLAudioElement | null = null;
    private themeConfig = { themeColor: '#000000', textColor: '#ff0000' };

    private constructor() { }

    public static getInstance(): DiceController {
        if (!DiceController.instance) {
            DiceController.instance = new DiceController();
        }
        return DiceController.instance;
    }

    public setTheme(themeColor: string, textColor: string) {
        this.themeConfig = { themeColor, textColor };
        // Attempt to update config directly if supported
        if (this.box && typeof this.box.updateConfig === 'function') {
            this.box.updateConfig({
                themeColor,
                theme_color: themeColor,
                textColor,
                text_color: textColor,
                labelColor: textColor,
                label_color: textColor,
                foreground: textColor
            });
        }
        console.log("DiceController: Theme updated", this.themeConfig);
    }

    public async init(containerId: string) {
        if (this.isInitialized) {
            console.log("DiceController: Already initialized");
            return;
        }

        // We need to ensure we are in the browser
        if (typeof window === 'undefined') return;

        console.log("DiceController: Initializing with container", containerId);

        try {
            // Initialize sound
            this.sound = new Audio('/assets/DiceSound.mp3');
            this.sound.volume = 0.6; // Not too loud

            // Dynamic import to avoid SSR issues
            const DiceBoxModule = await import("@3d-dice/dice-box");
            const DiceBox = DiceBoxModule.default;

            this.box = new DiceBox({
                container: containerId,
                theme: "default",
                themeColor: this.themeConfig.themeColor,
                theme_color: this.themeConfig.themeColor,
                textColor: this.themeConfig.textColor,
                text_color: this.themeConfig.textColor,
                // Add aliases to maximize compatibility
                labelColor: this.themeConfig.textColor,
                label_color: this.themeConfig.textColor,
                foreground: this.themeConfig.textColor,
                gravity: 3,
                friction: 0.5,
                mass: 1,
                lightIntensity: 1.3,
                scale: 5,
                throwForce: 6, // Reduced aggression
                // Point to local assets to avoid URL issues
                assetPath: '/assets/dice-box/',
            });

            await this.box.init();
            console.log("DiceController: DiceBox initialized successfully");
            this.isInitialized = true;

            // Process pending rolls
            if (this.pendingRolls.length > 0) {
                console.log("DiceController: Processing pending rolls", this.pendingRolls.length);
                for (const roll of this.pendingRolls) {
                    this.box.roll(roll.notation, {
                        ...this.themeConfig,
                        theme_color: this.themeConfig.themeColor,
                        labelColor: this.themeConfig.textColor,
                        label_color: this.themeConfig.textColor,
                        text_color: this.themeConfig.textColor,
                        foreground: this.themeConfig.textColor
                    }).then(roll.resolve);
                }
                this.pendingRolls = [];
            }
        } catch (error) {
            console.error("DiceController: Failed to initialize DiceBox", error);
        }
    }

    public async roll(notation: string | string[]): Promise<any> {
        console.log("DiceController: Roll requested", notation);

        // Play sound if available
        if (this.sound) {
            this.sound.currentTime = 0;
            // Randomize pitch between 0.8 and 1.2 to avoid repetition
            this.sound.playbackRate = 0.8 + Math.random() * 0.4;
            this.sound.play().catch(e => console.warn("Audio play failed", e));
        }

        if (!this.isInitialized) {
            console.log("DiceController: Not initialized, queuing roll");
            return new Promise((resolve) => {
                this.pendingRolls.push({ notation, resolve });
            });
        }
        // Apply theme config using both common property names
        const resultPromise = this.box.roll(notation, {
            ...this.themeConfig,
            theme_color: this.themeConfig.themeColor,
            labelColor: this.themeConfig.textColor,
            label_color: this.themeConfig.textColor,
            text_color: this.themeConfig.textColor,
            foreground: this.themeConfig.textColor
        });

        // Auto-clear dice 5 seconds AFTER the roll is finished/settled
        resultPromise.then(() => {
            setTimeout(() => {
                this.clear();
            }, 5000);
        });

        return resultPromise;
    }

    public clear() {
        if (this.box) {
            this.box.clear();
        }
    }

    public onRollComplete(callback: (result: any) => void) {
        if (this.box) {
            this.box.onRollComplete(callback);
        } else {
            // If not initialized, we can't subscribe yet. 
            // Ideally we'd queue this too, but for now let's just wait for init.
            // A simple retry mechanism or queue would be better.
            const check = setInterval(() => {
                if (this.box) {
                    this.box.onRollComplete(callback);
                    clearInterval(check);
                }
            }, 500);
        }
    }
}

export const diceController = DiceController.getInstance();
