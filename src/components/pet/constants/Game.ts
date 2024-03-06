import { PetSpaceScene } from "../scene/PetSpaceScene";
import * as Phaser from 'phaser';

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 225;

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
    scene: [PetSpaceScene]
};

export const petList = [
    'kirby'
];

export const petNatureList = {
    0:[0,1,2],
    1:[0,1,2],
    2:[0,1,2],
}

export const BEHAVIOR_SIZE = 2;