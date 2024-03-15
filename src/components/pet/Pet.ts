import { BEHAVIOR_SIZE, CANVAS_WIDTH, petList } from "./constants/Game";
import EventManager, { EVENTS } from "./manager/EventManager";

export class Pet {
    constructor() {
        this.container = null; // 컨테이너를 저장할 변수 추가
    }

    private sprites: Array<Phaser.GameObjects.Sprite> = [];
    private container: Phaser.GameObjects.Container; // 컨테이너를 저장할 변수 추가

    private moveDistance:string;
    private moveDuration:number;

    private info: object = {
        posX: CANVAS_WIDTH / 2,
        posY: 200,
        petId: null,
        natureId: null,
        nickname: null,
        currentFriendship: null,
        maxEvolutionFriendship_0: null,
        maxEvolutionFriendship_1: null,
        maxEvolutionFriendship_2: null,
        maxFriendship: null
    }

    setEvolution(): number {
        if (this.info['currentFriendship'] <= this.info['maxEvolutionFriendship_0']) {
            return 0;
        }
        if (this.info['currentFriendship'] <= this.info['maxEvolutionFriendship_1']) {
            return 1;
        }
        if (this.info['currentFriendship'] <= this.info['maxEvolutionFriendship_2']) {
            return 2;
        }
    }

    setData(data: object) {
        this.info['petId'] = data['petId'].petId;
        this.info['natureId'] = data['natureId'].natureId;
        this.info['nickname'] = data['petName'];
        this.info['currentFriendship'] = data['currentFriendship'];
        this.info['maxEvolutionFriendship_0'] = Math.floor(data['maxFriendship'] / 3);
        this.info['maxEvolutionFriendship_1'] = this.info['maxEvolutionFriendship_0'] + Math.floor(data['maxFriendship'] / 3);
        this.info['maxEvolutionFriendship_2'] = this.info['maxEvolutionFriendship_1'] + Math.floor(data['maxFriendship'] / 3);
        this.info['maxFriendship'] = data['maxFriendship'];
    }

    getData() {
        return this.info;
    }

    setContainer(container: Phaser.GameObjects.Container) {
        this.container = container; // 컨테이너 설정
    }

    setSprite(data: Phaser.GameObjects.Sprite) {
        this.sprites.push(data);
        if (this.container) {
            this.container.add(data); // 컨테이너에 스프라이트 추가
        }
    }

    getSprite() {
        return this.sprites;
    }

    startAnimation(lastBehavior: number, currentBehavior: number, behaviorCount: number, direction: string) {
        this.sprites[lastBehavior].anims.stop();
        this.sprites[lastBehavior].visible = false;
        this.sprites[currentBehavior].visible = true;

        const animationKey = `${petList[this.info['petId']]}_${this.setEvolution()}_${currentBehavior}_${direction}`;
        this.sprites[currentBehavior].anims.repeat = behaviorCount;
        this.sprites[currentBehavior].anims.play(animationKey)

        // currentBehavior가 0인 경우 위치를 변경하지 않음
        if (currentBehavior === 0) {
            EventManager.triggerEvent(EVENTS.BEHAVIOR_FINISH);
            return;
        }

        if(currentBehavior === 0){
            this.moveDistance = direction === 'l' ? '0' : '0';
            this.moveDuration = 5000;
        }
        if(currentBehavior === 1){
            this.moveDistance = direction === 'l' ? '-=32' : '+=32';
            this.moveDuration = 1000;
        }
        if(currentBehavior === 2){
            this.moveDistance = direction === 'l' ? '-=48' : '+=48';
            this.moveDuration = 300;
        }
        
        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i];
            const moveTween = sprite.scene.tweens.add({
                targets: sprite,
                x: this.moveDistance,
                duration:this.moveDuration,
                onUpdate: () => {
                    if (sprite.x < 28) {
                        sprite.x = 28;
                    } else if (sprite.x > CANVAS_WIDTH-28) {
                        sprite.x = CANVAS_WIDTH-28;
                    }
                },
                onComplete: () => {
                    EventManager.triggerEvent(EVENTS.BEHAVIOR_FINISH);
                }
            })
        }
    }
}
