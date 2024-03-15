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

    preload(){
       this.im.loadPetImage();
       this.im.loadBackgroundImage(); 
    }

    async create(){
        this.pet = new Pet();
        const container = this.add.container();
        this.pet.setContainer(container);
        try{
            const res = await axios.post(`${serverUrl}/api/user/has-pet`,{"email":"seop0937@gmail.com"});
            const data = res.data.data[0];
            this.pet.setData(data);
        } catch(error){
            console.error(error);
        }
        
        for(let i=0;i<=BEHAVIOR_SIZE;i++){
            this.pet.setSprite(this.im.createSprite(`${petList[this.pet.getData()['petId']]}_${this.pet.setEvolution()}_${i}`));
        }

        this.im.createSpriteAnimation();
        this.scene.launch('PetSpaceScene',{im:this.im,pet:this.pet});
    }
}