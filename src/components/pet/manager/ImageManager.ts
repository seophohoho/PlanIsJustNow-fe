import { BEHAVIOR_SIZE, petList, petNatureList } from "../constants/Game";
import {CANVAS_WIDTH,CANVAS_HEIGHT} from "../constants/Game";
import {MaxFrame,FrameRate,DELAY_RATE} from "../constants/MaxFrame";

export class ImageManager{
    constructor(private phaser:Phaser.Scene){}

    loadPetImage(){
        for(let i=0;i<=BEHAVIOR_SIZE;i++){
            this.phaser.load.atlas(`${petList[0]}_0_${i}`,`sprite/kirby/${petList[0]}_0_${i}.png`,`sprite/kirby/${petList[0]}_0_${i}.json`);
        } 
    }
    loadBackgroundImage(){
        
    }

    createUI(){
        const ui_1 = this.phaser.add.rectangle(-1,0,960,140,0xebeeff);
        const ui_2 = this.phaser.add.circle(30,35,20,0xffffff);

        const graphics = this.phaser.add.graphics();
        graphics.lineStyle(2, 0x5a67f6);
        graphics.strokeCircle(30, 35, 20);
        graphics.strokeRect(-1,0,480,70);
        
        const nicknameConfig={
            fontSize:18,
            color: '#060f82',
            fontStyle:'bold',
            fontFamily:'ui-monospace',
        }

        const heartConfig={
            fontSize:23,
            fontFamily:'ui-monospace',
        }

        const friendShipConfig={
            fontSize:13,
            color: '#8d9df5',
            fontStyle:'bold',
            fontFamily:'ui-monospace',
        }

        // 텍스트와 이모지 추가
        const nickname = this.phaser.add.text(
            60,
            10,
            '펭귄',
            nicknameConfig
        );

        const heart = this.phaser.add.text(
            60,
            35,
            '❤️',
            heartConfig
        );

        const friendship = this.phaser.add.text(
            89,
            30,
            '0 / 25000',
            friendShipConfig
        );

        heart.setAlign('center');
        nickname.setAlign('center');
        friendship.setAlign('center');

        const healthBarOuter = this.phaser.add.graphics();
        const healthBarInner_1 = this.phaser.add.graphics();
        const healthBarInner_2 = this.phaser.add.graphics();
    
        healthBarOuter.lineStyle(2, 0x060f82);
        healthBarOuter.strokeRoundedRect(90, 48, 200, 12,6); 

        healthBarInner_1.fillStyle(0xffffff, 1);
        healthBarInner_1.fillRoundedRect(90, 48, 200, 12,6);
  
        healthBarInner_2.fillStyle(0x060f82); 
        healthBarInner_2.fillRoundedRect(90, 48, 200, 12,6);

        // 체력 값을 기반으로 체력바 갱신하는 함수
        const updateHealthBar = (currentHealth, maxHealth) => {
            const healthWidth = (currentHealth / maxHealth) * 200;  // 최대 길이는 200
            healthBarInner_2.clear();  // 이전 그래픽을 지우고 새로 그림
            healthBarInner_2.fillStyle(0x060f82, 1);
            healthBarInner_2.fillRoundedRect(90, 48, healthWidth, 12,6);
        };

        // 예시: 체력을 75%로 설정
        updateHealthBar(190, 200);
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
            end:Math.floor(MaxFrame.STAY/2),
        });
        const petStayFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_0`,{
            prefix:`${petList[0]}_0_0-`,
            suffix:"",
            start:Math.floor(MaxFrame.STAY/2)+1,
            end:MaxFrame.STAY,
        });
        const petWalkFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_1`,{
            prefix:`${petList[0]}_0_1-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.WALK/2),
        });
        const petWalkFrameleft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_1`,{
            prefix:`${petList[0]}_0_1-`,
            suffix:"",
            start:Math.floor(MaxFrame.WALK/2)+1,
            end:MaxFrame.WALK,
        });
        const petRunFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_2`,{
            prefix:`${petList[0]}_0_2-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.RUN/2),
        });
        const petRunFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_2`,{
            prefix:`${petList[0]}_0_2-`,
            suffix:"",
            start:Math.floor(MaxFrame.RUN/2)+1,
            end:MaxFrame.RUN,
        });
        const petNapFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_3`,{
            prefix:`${petList[0]}_0_3-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.NAP/2),
        });
        const petNapFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_3`,{
            prefix:`${petList[0]}_0_3-`,
            suffix:"",
            start:Math.floor(MaxFrame.NAP/2)+1,
            end:MaxFrame.NAP,
        });
        const petSleepFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_4`,{
            prefix:`${petList[0]}_0_4-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.SLEEP/2),
        });
        const petSleepFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_4`,{
            prefix:`${petList[0]}_0_4-`,
            suffix:"",
            start:Math.floor(MaxFrame.SLEEP/2)+1,
            end:MaxFrame.SLEEP,
        });
        const petBoastFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_5`,{
            prefix:`${petList[0]}_0_5-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.BOAST/2),
        });
        const petBoastFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_5`,{
            prefix:`${petList[0]}_0_5-`,
            suffix:"",
            start:Math.floor(MaxFrame.BOAST/2)+1,
            end:MaxFrame.BOAST,
        });
        const petSneezeFrameRight = this.phaser.anims.generateFrameNames(`${petList[0]}_0_6`,{
            prefix:`${petList[0]}_0_6-`,
            suffix:"",
            start:0,
            end:Math.floor(MaxFrame.SNEEZE/2),
        });
        const petSneezeFrameLeft = this.phaser.anims.generateFrameNames(`${petList[0]}_0_6`,{
            prefix:`${petList[0]}_0_6-`,
            suffix:"",
            start:Math.floor(MaxFrame.SNEEZE/2)+1,
            end:MaxFrame.SNEEZE,
        });
        this.createAnimation(
            `${petList[0]}_0_0_r`,
            petStayFrameRight,
            FrameRate.STAY,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_0_l`,
            petStayFrameLeft,
            FrameRate.STAY,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_1_r`,
            petWalkFrameRight,
            FrameRate.WALK,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_1_l`,
            petWalkFrameleft,
            FrameRate.WALK,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_2_r`,
            petRunFrameRight,
            FrameRate.RUN,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_2_l`,
            petRunFrameLeft,
            FrameRate.RUN,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_3_r`,
            petNapFrameRight,
            FrameRate.NAP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_3_l`,
            petNapFrameLeft,
            FrameRate.NAP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_4_r`,
            petSleepFrameRight,
            FrameRate.SLEEP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_4_l`,
            petSleepFrameLeft,
            FrameRate.SLEEP,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_5_r`,
            petBoastFrameRight,
            FrameRate.BOAST,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_5_l`,
            petBoastFrameLeft,
            FrameRate.BOAST,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_6_r`,
            petSneezeFrameRight,
            FrameRate.SNEEZE,
            DELAY_RATE
        );
        this.createAnimation(
            `${petList[0]}_0_6_l`,
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