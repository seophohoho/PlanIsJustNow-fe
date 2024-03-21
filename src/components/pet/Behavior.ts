import {Pet} from './Pet'
import {BEHAVIOR, BEHAVIOR_RATE, MAX_BEHAVIOR_COUNT} from './constants/Game';

export class Behavior{
    constructor(
        private phaserTime:Phaser.Time.Clock,
        private pet:Pet,
    ){
        this.timerEvent = this.phaserTime.addEvent({
            delay:10,
            callback:this.setBehavior.bind(this),
            loop:true
        });
    }

    private timerEvent:Phaser.Time.TimerEvent;
    
    private currentBehavior:number=0;
    private lastBehavior:number;

    private currentDirection:string='l';
    private lastDirection:string;

    private behaviorGoalCount:number;

    isFinish:boolean=true;

    setBehavior(){
        if(this.isFinish){
            this.isFinish = false;
            this.lastBehavior = this.currentBehavior;
            this.currentBehavior = Number(this.getRandomBehavior(BEHAVIOR,this.pet.getNatureId()));
            this.behaviorGoalCount = this.getRandomBehaviorGoalCount(this.currentBehavior);
            
            this.lastDirection = this.currentDirection;
            this.currentDirection = this.getRandomDirection();
            this.pet.startAnimation(this.lastBehavior,this.currentBehavior,this.behaviorGoalCount,this.currentDirection);
        }
    }

    getRandomBehavior(enumeration:typeof BEHAVIOR,natureId:number){
        let totalProbability = 0;
        let range = [];

        for(const behavior in BEHAVIOR_RATE[natureId]){
            const probability = BEHAVIOR_RATE[natureId][behavior];
            totalProbability += probability;
            range.push({ behavior, end: totalProbability });
        }

        console.log(range);

        const randomNumber = Math.floor(Math.random() * totalProbability);
        const selectedBehavior = range.find((r) => randomNumber<r.end);
        return selectedBehavior.behavior;
    }

    getRandomBehaviorGoalCount(behavior:number){
        if(behavior === 0){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.STAY+1) + 30);}
        if(behavior === 1){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.WALK+1) + 1);}
        if(behavior === 2){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.RUN+1) + 3);}
        if(behavior === 3){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.NAP+1) + 1);}
        if(behavior === 4){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.SLEEP+1) + 5);}
        if(behavior === 5){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.BOAST+1) + 1);}
        if(behavior === 6){return Math.floor((Math.random() * MAX_BEHAVIOR_COUNT.SNEEZE+1) + 1);}
    }

    getRandomDirection(){
        const randomBit = Math.floor((Math.random() * 2));
        if(randomBit){return 'r';}
        else{return 'l';}
    }
}