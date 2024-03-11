import { Pet } from './Pet'
import { BEHAVIOR } from './constants/Game';

export class Behavior{
    constructor(
        private phaserTime:Phaser.Time.Clock,
        private pet:Pet,
    ){
        this.timerEvent = this.phaserTime.addEvent({
            delay:100,
            callback:this.setBehavior.bind(this),
            loop:true
        });
    }

    private timerEvent:Phaser.Time.TimerEvent;
    
    private currentBehavior:BEHAVIOR;
    private lastBehavior:BEHAVIOR;

    isFinish:boolean;

    setBehavior(){
        if(this.isFinish){
            this.lastBehavior = this.currentBehavior;
            this.currentBehavior = this.getRandomBehavior(BEHAVIOR);
    
            this.behaviorGoalCount = Phaser.Math.Between(5,10);
            this.info['behavior'] = Phaser.Math.Between(1,BEHAVIOR_SIZE);
            const randomDirection = Phaser.Math.Between(0,1);
    
            if(randomDirection == 1){this.info['direction'] = 'r'}
            else{this.info['direction'] = 'l'}
            this.startAnimation();
            this.isBehaviorFinish = false;
        }
    }
    getRandomBehavior(enumeration:BEHAVIOR){
        const values = Object.keys(enumeration);
        const enumKey = values[Math.floor(Math.random() * values.length)];
        return enumeration[enumKey];
    }
}