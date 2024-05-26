import * as Phaser from 'phaser';

export const CANVAS_WIDTH = 480; //480
export const CANVAS_HEIGHT = 225; //225

export const petList = [
    '0',
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
    },
    //활발한
    1:{
        0:20,
        1:80,
        2:80,
        3:20,
        4:50,
        5:20,
    },
    //장난꾸러기
    2:{
        0:50,
        1:50,
        2:50,
        3:50,
        4:50,
        5:50,
    }
};

export const enum MAX_BEHAVIOR_COUNT{
    STAY=100,
    WALK=6,
    RUN=4,
    NAP=1,
    SLEEP=20,
    BOAST=3,
}

export const BEHAVIOR_SIZE = 5;

export const BEHAVIOR = {
    0:'stay',
    1:'walk',
    2:'run',
    3:'nap',
    4:'sleep',
    5:'boast',
}

export const BEHAVIOR_RATE = {
    //얌전한
    0:{
        0:80,
        1:10,
        2:10,
        3:0,
        4:0,
        5:0,
    },
    //활발한
    1:{
        0:20,
        1:80,
        2:80,
        3:10,
        4:10,
        5:80,
    },
    //장난꾸러기
    2:{
        0:0.9,
        1:0.1,
        2:0.05,
        3:0.02,
        4:0.3,
        5:0.5,
    }
}