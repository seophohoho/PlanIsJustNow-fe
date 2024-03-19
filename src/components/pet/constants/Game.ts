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
    //얌전한
    0:{
        0:80,
        1:10,
        2:10,
        3:50,
        4:60,
        5:5,
        6:10,
    },
    //활발한
    1:{
        0:20,
        1:80,
        2:80,
        3:20,
        4:20,
        5:80,
        6:60,
    },
    //장난꾸러기
    2:{
        0:50,
        1:50,
        2:50,
        3:50,
        4:50,
        5:50,
        6:50,
    }
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

export const BEHAVIOR_RATE = {
    //얌전한
    0:{
        0:80,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
    },
    //활발한
    1:{
        0:20,
        1:80,
        2:80,
        3:10,
        4:10,
        5:80,
        6:20,
    },
    //장난꾸러기
    2:{
        0:0.9,
        1:0.1,
        2:0.05,
        3:0.02,
        4:0.3,
        5:0.5,
        6:0.8,
    }
}