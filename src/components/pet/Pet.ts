import { BEHAVIOR_SIZE, petList } from "./constants/Game";
import EventManager, { EVENTS } from "./manager/EventManager";

export class Pet{
    constructor(){}
    
    /*0-stay 1-walk 2-run*/
    private sprites:Array<Phaser.GameObjects.Sprite>=[];

    private info:object={
        posX:null,
        posY:null,
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

    startAnimation(lastBehavior:number,currentBehavior:number,behaviorCount:number,direction:string){
        this.sprites[lastBehavior].anims.stop();
        
        this.sprites[lastBehavior].visible = false;
        this.sprites[currentBehavior].visible = true;
        
        const animationKey = `${petList[this.info['petId']]}_${this.setEvolution()}_${currentBehavior}_${direction}`;
        
        this.sprites[currentBehavior].anims.repeat = behaviorCount;
        this.sprites[currentBehavior].anims.play(animationKey);
        this.sprites[currentBehavior].on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            EventManager.triggerEvent(EVENTS.BEHAVIOR_FINISH);
        }, this);
    }
}