import { petList } from "./constants/Game";

export class Pet{
    constructor(
        private phaserTime:Phaser.Time.Clock,
    ){
        this.timerEvent = this.phaserTime.addEvent({
            delay:500,
            callback:this.startAnimation.bind(this),
            loop:true
        });
    }

    private timerEvent:Phaser.Time.TimerEvent;
    /*0-stay 1-walk 2-run*/
    private sprites:Array<Phaser.GameObjects.Sprite>=[];
    private lastBehavior:number=0;
    private behaviorCount:number=0;
    private behaviorGoalCount:number=0;
    private lastDirection:boolean=false;
    private info:object={
        posX:null,
        posY:null,
        behavior:1,
        direction:'r',
        petId:null,
        natureId:null,
        nickname:null,
        currentFriendship:null,
        maxEvolutionFriendship_0:null,
        maxEvolutionFriendship_1:null,
        maxEvolutionFriendship_2:null,
        maxFriendship:null
    }
    setEvolution():number{
        if(this.info['currentFriendship'] <= this.info['maxEvolutionFriendship_0']){return 0;}
        if(this.info['currentFriendship'] <= this.info['maxEvolutionFriendship_1']){return 1;}
        if(this.info['currentFriendship'] <= this.info['maxEvolutionFriendship_2']){return 2;}
    }
    setData(data:object){
        this.info['petId'] = data['petId'].petId;
        this.info['natureId'] = data['natureId'].natureId;
        this.info['nickname'] = data['petName'];
        this.info['currentFriendship'] = data['currentFriendship'];
        this.info['maxEvolutionFriendship_0'] = Math.floor(data['maxFriendship']/3);
        this.info['maxEvolutionFriendship_1'] = this.info['maxEvolutionFriendship_0']+Math.floor(data['maxFriendship']/3);
        this.info['maxEvolutionFriendship_2'] = this.info['maxEvolutionFriendship_1']+Math.floor(data['maxFriendship']/3);
        this.info['maxFriendship'] = data['maxFriendship'];
    }

    getData(){
        return this.info;
    }

    setSprite(data:Phaser.GameObjects.Sprite){
        this.sprites.push(data);
    }

    getSprite(){
        return this.sprites;
    }
    getPetInfo(){
        return this.info['petInfo'].petId;
    }
    startBehavior(){
        if(this.behaviorCount != this.behaviorGoalCount){
            this.startAnimation();
        }
        else{
            this.timerEvent.paused = false;
        }
    }
    setBehavior(id:number,direction:number){
        this.behaviorGoalCount = Phaser.Math.Between(1,6);
        this.lastBehavior = this.info['behavior'];
        this.lastDirection = this.info['direction'];

        if(direction == 1){this.info['direction'] = 'r'}
        else{this.info['direction'] = 'l'}

        this.info['behavior'] = id;
    }
    startAnimation(){
        this.setBehavior(Phaser.Math.Between(0,2),Phaser.Math.Between(0,1));
        this.sprites[this.lastBehavior].anims.stop();
        this.sprites[this.lastBehavior].visible = false;
        this.sprites[this.info['behavior']].visible = true;
        
        const animationKey = `${petList[this.info['petId']]}_${this.setEvolution()}_${this.info['behavior']}_${this.info['direction']}`;
        this.sprites[this.info['behavior']].anims.play(animationKey)
        this.sprites[this.info['behavior']].on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.timerEvent.paused = true;
            this.behaviorCount++;
        }, this);
    }
}