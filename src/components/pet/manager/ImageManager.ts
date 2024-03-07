import { BEHAVIOR_SIZE, petList, petNatureList } from "../constants/Game";
import {CANVAS_WIDTH,CANVAS_HEIGHT} from "../constants/Game";
import {DELAY_RATE, FRAME_RATE, MaxFrame} from "../constants/MaxFrame";

export class ImageManager{
    constructor(private phaser:Phaser.Scene){}

    loadPetImage(){
        for(let i=0;i<=BEHAVIOR_SIZE;i++){
            this.phaser.load.atlas(`${petList[0]}_0_${i}`,`sprite/kirby/${petList[0]}_0_${i}.png`,`sprite/kirby/${petList[0]}_0_${i}.json`);
        }
    }
    loadBackgroundImage(){

    }
    createSprite(key:string){
        const sprite = this.phaser.add.sprite(CANVAS_WIDTH/2,200,key);
        sprite.scale = 2;
        sprite.visible = false;
        return sprite;
    }
    createSpriteAnimation(){
        const petStayFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_0`,{
            prefix:`${petList[0]}_0_0-`,
            suffix:"",
            start:0,
            end:MaxFrame.STAY/2,
        });
        console.log(petStayFrameRight);
        const petStayFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_0`,{
            prefix:`${petList[0]}_0_0-`,
            suffix:"",
            start:MaxFrame.STAY/2+1,
            end:MaxFrame.STAY,
        });
        const petWalkFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_1`,{
            prefix:`${petList[0]}_0_1-`,
            suffix:"",
            start:0,
            end:MaxFrame.WALK/2,
        });
        const petWalkFrameleft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_1`,{
            prefix:`${petList[0]}_0_1-`,
            suffix:"",
            start:MaxFrame.WALK/2+1,
            end:MaxFrame.WALK,
        });
        const petRunFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_2`,{
            prefix:`${petList[0]}_0_2-`,
            suffix:"",
            start:0,
            end:MaxFrame.RUN/2,
        });
        const petRunFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_2`,{
            prefix:`${petList[0]}_0_2-`,
            suffix:"",
            start:MaxFrame.RUN/2+1,
            end:MaxFrame.RUN,
        });
        this.createAnimation(
            `${petList[0]}_0_0_r`,
            petStayFrameRight,
            FRAME_RATE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_0_l`,
            petStayFrameLeft,
            FRAME_RATE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_1_r`,
            petWalkFrameRight,
            FRAME_RATE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_1_l`,
            petWalkFrameleft,
            FRAME_RATE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_2_r`,
            petRunFrameRight,
            FRAME_RATE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_2_l`,
            petRunFrameLeft,
            FRAME_RATE,
            DELAY_RATE
        );
    }
    private createAnimation(
        name: string,
        frames: Phaser.Types.Animations.AnimationFrame[],
        frameRate: number,
        delay: number
      ) {
          this.phaser.anims.create({
            key: name,
            frames: frames,
            frameRate: frameRate,
            repeat: -1,
            delay:delay,
            yoyo:false
        });
      }
}