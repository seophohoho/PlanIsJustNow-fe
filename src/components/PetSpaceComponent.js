import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import {config} from './pet/constants/Game'

function PetSpaceComponent() {
    useEffect(() => {
        console.log('????');
        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div id='phaser-container'></div>  
    );
}

export default PetSpaceComponent;