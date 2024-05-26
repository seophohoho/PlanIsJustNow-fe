import { BEHAVIOR_SIZE, petList, petNatureList } from "../constants/Game";
import {CANVAS_WIDTH,CANVAS_HEIGHT} from "../constants/Game";
import {MaxFrame,FrameRate,DELAY_RATE} from "../constants/MaxFrame";

export class ImageManager{
    constructor(private phaser:Phaser.Scene){}

    loadPetImage(petId:number,evolId:number){
        console.log(petId,evolId);
        for(let j=0;j<=BEHAVIOR_SIZE;j++){
            this.phaser.load.atlas(`${petId}_${evolId}_${j}`,`sprite/${petId}/${petId}_${evolId}_${j}.png`,`sprite/${petId}/${petId}_${evolId}_${j}.json`);
        }
        this.phaser.load.start();
    }

    createSprite(key:string){
        const sprite = this.phaser.add.sprite(CANVAS_WIDTH/2,200,key);
        sprite.scale = 2;
        sprite.visible = false;
        return sprite;
    }
    createSpriteAnimation(petId:number,evolId:number){
        const petStayFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_0`,{
            prefix:`${petId}_${evolId}_0-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.STAY/2),
        });
        const petStayFrameLeft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_0`,{
            prefix:`${petId}_${evolId}_0-`,
            suffix:"",
            start:Math.floor(MaxFrame.STAY/2)+1,
            end:MaxFrame.STAY,
        });
        const petWalkFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_1`,{
            prefix:`${petId}_${evolId}_1-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.WALK/2),
        });
        const petWalkFrameleft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_1`,{
            prefix:`${petId}_${evolId}_1-`,
            suffix:"",
            start:Math.floor(MaxFrame.WALK/2)+1,
            end:MaxFrame.WALK,
        });
        const petRunFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_2`,{
            prefix:`${petId}_${evolId}_2-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.RUN/2),
        });
        const petRunFrameLeft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_2`,{
            prefix:`${petId}_${evolId}_2-`,
            suffix:"",
            start:Math.floor(MaxFrame.RUN/2)+1,
            end:MaxFrame.RUN,
        });
        const petNapFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_3`,{
            prefix:`${petId}_${evolId}_3-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.NAP/2),
        });
        const petNapFrameLeft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_3`,{
            prefix:`${petId}_${evolId}_3-`,
            suffix:"",
            start:Math.floor(MaxFrame.NAP/2)+1,
            end:MaxFrame.NAP,
        });
        const petSleepFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_4`,{
            prefix:`${petId}_${evolId}_4-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.SLEEP/2),
        });
        const petSleepFrameLeft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_4`,{
            prefix:`${petId}_${evolId}_4-`,
            suffix:"",
            start:Math.floor(MaxFrame.SLEEP/2)+1,
            end:MaxFrame.SLEEP,
        });
        const petBoastFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_5`,{
            prefix:`${petId}_${evolId}_5-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.BOAST/2),
        });
        const petBoastFrameLeft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_5`,{
            prefix:`${petId}_${evolId}_5-`,
            suffix:"",
            start:Math.floor(MaxFrame.BOAST/2)+1,
            end:MaxFrame.BOAST,
        });
        const petSneezeFrameRight = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_6`,{
            prefix:`${petId}_${evolId}_6-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.SNEEZE/2),
        });
        const petSneezeFrameLeft = this.phaser.anims.generateFrameNames(`${petId}_${evolId}_6`,{
            prefix:`${petId}_${evolId}_6-`,
            suffix:"",
            start:Math.floor(MaxFrame.SNEEZE/2)+1,
            end:MaxFrame.SNEEZE,
        });
        this.createAnimation(
            `${petId}_${evolId}_0_r`,
            petStayFrameRight,
            FrameRate.STAY,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_0_l`,
            petStayFrameLeft,
            FrameRate.STAY,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_1_r`,
            petWalkFrameRight,
            FrameRate.WALK,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_1_l`,
            petWalkFrameleft,
            FrameRate.WALK,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_2_r`,
            petRunFrameRight,
            FrameRate.RUN,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_2_l`,
            petRunFrameLeft,
            FrameRate.RUN,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_3_r`,
            petNapFrameRight,
            FrameRate.NAP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_3_l`,
            petNapFrameLeft,
            FrameRate.NAP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_4_r`,
            petSleepFrameRight,
            FrameRate.SLEEP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_4_l`,
            petSleepFrameLeft,
            FrameRate.SLEEP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_5_r`,
            petBoastFrameRight,
            FrameRate.BOAST,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_5_l`,
            petBoastFrameLeft,
            FrameRate.BOAST,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_6_r`,
            petSneezeFrameRight,
            FrameRate.SNEEZE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petId}_${evolId}_6_l`,
            petSneezeFrameLeft,
            FrameRate.SNEEZE,
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
            repeat: 0,
            delay:delay,
            yoyo:false
        });
      }
}