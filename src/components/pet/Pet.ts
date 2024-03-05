export class Pet{
    constructor(
    ){}

    private sprites:Array<Phaser.GameObjects.Sprite>=[];

    private info:object={
        petInfo:null,
        natureInfo:null,
        nickname:null,
        currentFriendship:null,
        maxFriendship:null
    }
    
    setData(data:object){
        this.info['petInfo'] = data['petId'];
        this.info['natureInfo'] = data['natureId'];
        this.info['nickname'] = data['petName'];
        this.info['currentFriendship'] = data['currentFriendship'];
        this.info['maxFriendship'] = data['maxFriendship'];
    }

    getData(){
        return this.info;
    }

    setSprite(data:Phaser.GameObjects.Sprite){
        this.sprites.push(data);
    }

    getPetInfo(){
        return this.info['petInfo'].petId;
    }
}