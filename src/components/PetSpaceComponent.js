import React, { useEffect } from 'react';
import Phaser from 'phaser';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

function PetSpaceComponent() {
    useEffect(() => {
        // Phaser 게임 인스턴스를 생성하고 설정합니다.
        const config = {
            type: Phaser.AUTO,
            width: 480, // 너비를 조정하십시오.
            height: 150, // 높이를 조정하십시오.
            
            backgroundColor: '#eee',
            parent: 'phaser-container', // 게임을 렌더링할 요소의 ID를 지정합니다.
            scene: {
                preload: preload,
                create: create,
                update: update,
                extends:{
                    test:null,
                }
            }
        };

        const game = new Phaser.Game(config);
        // 게임 초기화를 위한 함수들

        function init() {
            
        }

        function preload() {
            //this.load.atlas('test','pet/kirby_0_walk.png',); json 필요.
        }

        function create(){
            // this.test = this.add.sprite(5,5,'test');
        }

        function update(){
            const gameId = document.getElementById("phaser-container"); // Target div that wraps the phaser game
            gameId.style.width = '100%'; // set width to 100%
            gameId.style.height = '100%'; // set height to 100%
        }

        return () => {
            // 컴포넌트가 언마운트될 때 게임을 정리합니다.
            game.destroy(true);
        };
    }, []);

    return (
        <div className='h-200' id='phaser-container'>
            <div className='w-max h-25'>임시박스</div>
        </div>
    );
}

export default PetSpaceComponent;
