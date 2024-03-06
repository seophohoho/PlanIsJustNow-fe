import * as Phaser from 'phaser';
import serverUrl from "../../../serverConfig"
import { ImageManager } from '../manager/ImageManager';
import axios from 'axios';
import EventManager, { EVENTS } from '../manager/EventManager';
import { Pet } from '../Pet';
import { BEHAVIOR_SIZE } from '../constants/Game';

export class PetSpaceScene extends Phaser.Scene{
    constructor(){
        super('PetSpaceScene');
        this.imagemanager = new ImageManager(this);
    }

    private imagemanager:ImageManager;
    private pet:Pet=null;

    init(){
        EventManager.onEvent(EVENTS.SET_PET,(data)=>{this.pet.setData(data[0]);});
    }

    preload(){
        this.imagemanager.loadPetImage();
    }

    async create(){
        try{
            const res = await axios.post(`${serverUrl}/api/user/has-pet`,{"email":"seop0937@gmail.com"});
            const data = res.data.data[0];
            EventManager.triggerEvent(EVENTS.SET_PET,data);
        } catch(error){
            console.error(error);
        }
    }

    update(){
        
    }
}