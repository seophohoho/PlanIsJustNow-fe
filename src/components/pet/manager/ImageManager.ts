import { BEHAVIOR_SIZE, petList, petNatureList } from "../constants/Game";

export class ImageManager{
    constructor(private phaser:Phaser.Scene){}

    loadPetImage(){
        for(let i=0;i<=BEHAVIOR_SIZE;i++){
            this.phaser.load.atlas(`${petList[0]}_0_${i}`,`sprite/kirby/${petList[0]}_0_${i}.png`,`sprite/kirby/${petList[0]}_0_${i}.json`);
        }
    }
    createSprite(key){
        return this.phaser.add.sprite(100,100,key);
    }
}