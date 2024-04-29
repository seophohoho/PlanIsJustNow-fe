import React, { useEffect, useState } from 'react';
import * as Phaser from 'phaser';
import {config} from './pet/constants/Game'
import { useSelector } from 'react-redux';

function PetSpaceComponent() {
    const state = useSelector(state => state)

    useEffect(() => {
        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    },[]);

    return (
        <div id='phaser-container'></div>  
    );
}

export default PetSpaceComponent;