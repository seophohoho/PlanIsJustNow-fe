import React, { useEffect } from 'react';
import Phaser from 'phaser';

function PetSpaceComponent() {
    useEffect(() => {
        // Phaser 게임 인스턴스를 생성하고 설정합니다.
        const config = {
            type: Phaser.AUTO,
            width: 696, // 너비를 조정하십시오.
            height: 200, // 높이를 조정하십시오.
            backgroundColor: '#4488aa',
            parent: 'phaser-container', // 게임을 렌더링할 요소의 ID를 지정합니다.
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config);
        // 게임 초기화를 위한 함수들
        function preload() {
            // 필요한 리소스를 로드합니다.
        }

        function create() {
            // 게임 오브젝트를 생성하고 배치합니다.
        }

        function update() {
            // 게임 루프 업데이트를 수행합니다.
        }

        return () => {
            // 컴포넌트가 언마운트될 때 게임을 정리합니다.
            game.destroy(true);
        };
    }, []);

    return (
        <div className='h-200' id='phaser-container'></div>
    );
}

export default PetSpaceComponent;
