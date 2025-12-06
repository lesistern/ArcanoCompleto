declare module '@3d-dice/dice-box' {
    export default class DiceBox {
        constructor(element: string | HTMLElement, options?: any);
        init(): Promise<void>;
        roll(notation: string | string[]): Promise<any>;
        onRollComplete(callback: (results: any) => void): void;
        // Add other methods as needed
    }
}
