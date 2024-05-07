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
        maxFriendship: null
    }

    setData(data: object) {
        this.info['petId'] = data['petId'].petId;
        this.info['natureId'] = data['natureId'].natureId;
        this.info['nickname'] = data['petName'];
        this.info['currentFriendShip'] = data['currentFriendShip'];
        this.info['maxFriendShip'] = data['maxFriendShip'];
    }

    getData() {
        return this.info;
    }
    
    getNatureId(){
        return this.info['natureId'];
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

    startAnimation(petId:number,evolId:number,lastBehavior: number, currentBehavior: number, behaviorCount: number, direction: string) {
        this.sprites[lastBehavior].anims.stop();
        this.sprites[lastBehavior].visible = false;
        this.sprites[currentBehavior].visible = true;
        const animationKey = `${petId}_${evolId}_${currentBehavior}_${direction}`;
        this.sprites[currentBehavior].anims.repeat = behaviorCount;
        console.log(animationKey);
        this.sprites[currentBehavior].anims.play(animationKey);

        if(currentBehavior === 0){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 1000;
        }
        else if(currentBehavior === 1){
            this.moveDistanceX = direction === 'l' ? '-=32' : '+=32';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 0;
        }
        else if(currentBehavior === 2){
            this.moveDistanceX = direction === 'l' ? '-=48' : '+=48';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 300;
            this.completeDelay = 0;
        }
        else if(currentBehavior === 3){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 5000;
        }
        else if(currentBehavior === 4){
            this.moveDistanceX = direction === 'l' ? '-=0' : '+=0';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 500;
            this.completeDelay = 5000;
        }
        else if(currentBehavior === 5){
            this.moveDistanceX = direction === 'l' ? '-=64' : '+=64';
            this.moveDistanceY = direction === 'l' ? '-=0' : '+=0';
            this.moveDuration = 1000;
            this.completeDelay = 1000;
        }
        else if(currentBehavior === 6){
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
                ease:'Linear',
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
