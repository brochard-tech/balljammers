import { Assets } from "sideral/Tool";

import Player from "./../../Players";


Assets.preload("robot", "media/images/characters/robot.png")
    .preload("robot-portrait", "media/images/characters/robot-portrait.png")
    .preload("robot-idle", "media/images/characters/robot-idle.png");


export default class Robot extends Player {

    /* LIFECYCLE */

    /**
     * @constructor
     */
    constructor () {
        super();

        this.setProps({
            width: 25,
            height: 45
        });

        this.addSprite("cat", 65, 65, { x: -20, y: -14 })
            .addAnimation("idle", 50, [18, 19, 20, 21, 22, 23, 24, 25, 26, 27])
            .addAnimation("run", 45, [36, 37, 38, 39, 40, 41, 42, 43])
            .addAnimation("jump", 55, [0, 1, 2, 3, 4, 5, 6, 7], 0)
            .addAnimation("attack", 45, [28, 29, 30, 31, 32]);
    }
}

/* ATTRIBUTES */

Robot.CHARACTER_ID = "robot";
Robot.SPEED = 175;
Robot.POWER = 500;
Robot.SPELL = "Causes confusion";
Robot.IMAGE_IDLE = "robot-idle";
Robot.IMAGE_PORTRAIT = "robot-portrait";