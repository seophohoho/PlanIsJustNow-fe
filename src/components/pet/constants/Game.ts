import { PetSpaceScene } from "../scene/PetSpaceScene";
import {InitScene} from "../scene/InitScene";
import * as Phaser from 'phaser';

export const CANVAS_WIDTH = 480;
export const CANVAS_HEIGHT = 225;

export const config = {
    type: Phaser.AUTO,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,

    render: {
        antialias: false,
    },
    pixelArt:true,
    fps:{
        target: 60,
        forceSetTimeOut: true
    },
    
    backgroundColor: '#486870',
    parent: 'phaser-container', // 게임을 렌더링할 요소의 ID를 지정합니다.
    scene: [InitScene,PetSpaceScene],
};

export const petList = [
    'kirby',
];

export const petNatureList = {
    0:[0,1,2,3,4,5,6],
    1:[0,1,2,3,4,5,6],
    2:[0,1,2,3,4,5,6],
};

export const enum MAX_BEHAVIOR_COUNT{
    STAY=100,
    WALK=6,
    RUN=4,
    NAP=1,
    SLEEP=20,
    BOAST=3,
    SNEEZE=3,
}

export const BEHAVIOR_SIZE = 7;

export const BEHAVIOR = {
    0:'stay',
    1:'walk',
    2:'run',
    3:'nap',
    4:'sleep',
    5:'boast',
    6:'sneeze',
}