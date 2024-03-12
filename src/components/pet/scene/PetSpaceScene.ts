import * as Phaser from 'phaser';
import serverUrl from "../../../serverConfig"
import { ImageManager } from '../manager/ImageManager';
import axios from 'axios';
import EventManager, { EVENTS } from '../manager/EventManager';
import { Pet } from '../Pet';
import { Behavior } from '../Behavior'
import { BEHAVIOR_SIZE, petList } from '../constants/Game';

export class PetSpaceScene extends Phaser.Scene{
    constructor(){
        super({key:'PetSpaceScene'});
    }

    private im:ImageManager;
    private pet:Pet=null;
    private behavior:Behavior;

    init(){
        EventManager.onEvent(EVENTS.BEHAVIOR_FINISH,()=>{
            this.behavior.isFinish = true;
        });
    }

    create(data:object){
        this.im = data['im'];
        this.pet = data['pet'];
        this.behavior = new Behavior(this.time,this.pet);
    }
}