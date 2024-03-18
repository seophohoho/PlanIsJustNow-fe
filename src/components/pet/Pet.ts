import { BEHAVIOR_SIZE, CANVAS_WIDTH, petList } from "./constants/Game";
import EventManager, { EVENTS } from "./manager/EventManager";

export class Pet {
    constructor() {
        this.container = null; // 컨테이너를 저장할 변수 추가
    }

    private sprites: Array<Phaser.GameObjects.Sprite> = [];
    private container: Phaser.GameObjects.Container; // 컨테이너를 저장할 변수 추가

    private moveDistanceX:string;
    private moveDistanceY:string;
    private moveDuration:number;
    private completeDelay:number;

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

        if(currentBehavior === 0){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 1000;
        }
        if(currentBehavior === 1){
            this.moveDistanceX = direction === 'l' ? '-=32' : '+=32';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 0;
        }
        if(currentBehavior === 2){
            this.moveDistanceX = direction === 'l' ? '-=48' : '+=48';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 300;
            this.completeDelay = 0;
        }
        if(currentBehavior === 3){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 1000;
        }
        if(currentBehavior === 4){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 0;
        }
        if(currentBehavior === 5){
            this.moveDistanceX = direction === 'l' ? '-=32' : '+=32';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 1000;
        }
        if(currentBehavior === 6){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 1000;
        }

        for (let i = 0; i < this.sprites.length; i++) {
            const sprite = this.sprites[i];
            const moveTween = sprite.scene.tweens.add({
                targets: sprite,
                x: this.moveDistanceX,
                y: this.moveDistanceY,
                duration:this.moveDuration,
                completeDelay:this.completeDelay,
                onUpdate: () => {
                    if (sprite.x < 28) {sprite.x = 28;} 
                    else if (sprite.x > CANVAS_WIDTH-28) {sprite.x = CANVAS_WIDTH-28;}
                },
                onComplete: () => {
                    EventManager.triggerEvent(EVENTS.BEHAVIOR_FINISH);
                }
            })
        }
    }
}
