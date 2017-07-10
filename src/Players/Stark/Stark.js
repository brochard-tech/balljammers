import { Assets } from "sideral/Tool";

import Player from "./../../Players";


Assets.preload("stark", "media/images/characters/stark.png")
    .preload("stark-portrait", "media/images/characters/stark-portrait.png")
    .preload("stark-idle", "media/images/characters/stark-idle.png");


export default class Stark extends Player {

    /* LIFECYCLE */

    /**
     * @constructor
     */
    constructor() {
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

Stark.CHARACTER_ID = "stark";
Stark.SPEED = 200;
Stark.POWER = 375;
Stark.SPELL = "Shoots and stun";
Stark.IMAGE_IDLE = "stark-idle";
Stark.IMAGE_PORTRAIT = "stark-portrait";