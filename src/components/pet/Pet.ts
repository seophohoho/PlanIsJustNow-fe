import { petList } from "./constants/Game";
import {Behavior} from "./Behavior";
export class Pet{
    constructor(
    ){
        this.behavior = new Behavior();
    }
    /*0-stay 1-walk 2-run*/
    private sprites:Array<Phaser.GameObjects.Sprite>=[];
    private lastBehavior:number=0;
    private behavior:Behavior;
    private info:object={
        posX:null,
        posY:null,
        behavior:0,
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
        this.info['maxEvolutionFriendship_0'] = data['maxFriendship']/3;
        this.info['maxEvolutionFriendship_1'] = this.info['maxEvolutionFriendship_0']+(data['maxFriendship']/3);
        this.info['maxEvolutionFriendship_2'] = this.info['maxEvolutionFriendship_1']+(data['maxFriendship']/3);
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
    setBehavior(){
    }
    startAnimation(){
        this.sprites[this.lastBehavior].anims.stop();
        this.sprites[this.lastBehavior].visible = false;
        this.sprites[this.info['behavior']].visible = true;
        this.sprites[this.info['behavior']].anims.play(`${petList[0]}_${this.setEvolution()}_${this.info['behavior']}_${this.info['direction']}`);
    }
}