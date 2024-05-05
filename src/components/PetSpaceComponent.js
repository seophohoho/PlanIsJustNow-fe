import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';
import { PetSpaceScene } from "./pet/scene/PetSpaceScene"
import {InitScene} from "./pet/scene/InitScene";
import {PetUIScene} from "./pet/scene/PetUIScene"
import { CANVAS_WIDTH,CANVAS_HEIGHT } from './pet/constants/Game';

function PetSpaceComponent(props) {
    const targetPet = props.targetPetData;
    useEffect(() => {
        if(targetPet !== undefined){
            const config = {
                type: Phaser.AUTO,
                width: CANVAS_WIDTH,
                height: CANVAS_HEIGHT,
                render: {
                    antialias: true, // 안티앨리어싱 활성화
                    pixelArt: false // 픽셀 아트 게임이 아니라면 false로 설정
                },
                fps:{
                    target: 60,
                    forceSetTimeOut: true
                },
                backgroundColor: '#486870',
                parent: 'phaser-container', // 게임을 렌더링할 요소의 ID를 지정합니다.
                scene: [InitScene,PetSpaceScene,PetUIScene],
            };
            InitScene.initData = targetPet[0];
            const game = new Phaser.Game(config);
            return () => {
                game.destroy(true);
            };
        }
    },[]);

    return (
        <div id='phaser-container'></div>  
    );
}

export default PetSpaceComponent;