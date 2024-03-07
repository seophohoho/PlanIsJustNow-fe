import * as Phaser from 'phaser';
import serverUrl from "../../../serverConfig"
import { ImageManager } from '../manager/ImageManager';
import axios from 'axios';
import EventManager, { EVENTS } from '../manager/EventManager';
import { Pet } from '../Pet';
import { BEHAVIOR_SIZE, petList } from '../constants/Game';

export class PetSpaceScene extends Phaser.Scene{
    constructor(){
        super({key:'PetSpaceScene'});
    }
    private test:number = 0;
    private im:ImageManager;
    private pet:Pet=null;

    create(data:object){
        this.im = data['im'];
        this.pet = data['pet'];
    }

    update(){
        if(this.pet){
            if(this.test === 0){
                this.pet.startAnimation(); 
                this.test++;
            }
        }

    }
}