export const enum EVENTS {
    SET_PET = "set-pet",
    INIT_FINISH = "init-finish",
}

class EventManager extends Phaser.Events.EventEmitter {
    constructor() {
        super();
        this.registeredEvents = {
            [EVENTS.SET_PET]: new Phaser.Events.EventEmitter(),
            [EVENTS.INIT_FINISH]: new Phaser.Events.EventEmitter(),
        };
    }

    private registeredEvents: Record<string, Phaser.Events.EventEmitter>;

    triggerEvent(eventName: string, ...args: any[]) {
        if (this.registeredEvents[eventName]) {
            this.registeredEvents[eventName].emit(eventName,args);
        } else {
            console.error(`Event "${eventName}" is not registered.`);
        }
    }
    onEvent(eventName: string, listener: (...args: any[]) => void) {
        if (this.registeredEvents[eventName]) {
            this.registeredEvents[eventName].on(eventName, listener);
        } else {
            console.error(`Event "${eventName}" is not registered.`);
        }
    }
}

export default new EventManager();