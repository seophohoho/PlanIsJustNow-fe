import React, { useEffect } from 'react';
import * as Phaser from 'phaser';
import {config} from './pet/constants/Game'

function PetSpaceComponent() {
    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);

    return (
        <div className='fc-direction-ltr' id='phaser-container'></div>  
    );
}

export default PetSpaceComponent;