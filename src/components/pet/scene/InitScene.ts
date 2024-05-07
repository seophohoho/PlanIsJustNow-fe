import axios from "axios";
import { Pet } from "../Pet";
import { BEHAVIOR_SIZE, petList } from "../constants/Game";
import EventManager, { EVENTS } from "../manager/EventManager";
import { ImageManager } from "../manager/ImageManager";
import serverUrl from "../../../serverConfig";

export class InitScene extends Phaser.Scene{
    constructor(){
        super({key:'InitScene'});
        this.im = new ImageManager(this);
    }

    private im:ImageManager;
    private pet:Pet;
    
    static initData:any;
 
    preload(){
       this.im.loadPetImage(InitScene.initData.petId.petId,InitScene.initData.evol);
    }
    create(){
        this.pet = new Pet();
        const container = this.add.container();
        this.pet.setContainer(container);
        this.pet.setData(InitScene.initData);

        for(let i=0;i<=BEHAVIOR_SIZE;i++){
            this.pet.setSprite(this.im.createSprite(`${InitScene.initData.petId}_${InitScene.initData.evol}_${i}`));
        }

        this.im.createSpriteAnimation(InitScene.initData.petId.petId,InitScene.initData.evol);

        this.scene.launch('PetSpaceScene',{im:this.im,pet:this.pet,petId:InitScene.initData.petId.petId,evolId:InitScene.initData.evol});
    }
}