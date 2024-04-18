import { ImageManager } from '../manager/ImageManager';

export class PetUIScene extends Phaser.Scene{
    constructor(){
        super({key:'PetUIScene'});
        
    };

    init(){
        //이벤트 초기화해야할듯?...          
    }

    private im:ImageManager;

    create(data:object){
        this.im = data['im'];
        this.im.createUI();
        this.im.createIcon();
    }
}