import { Assets } from "sideral/Tool";

import Player from "./../../Players";


Assets.preload("rogue", "media/images/characters/rogue.png")
    .preload("rogue-portrait", "media/images/characters/rogue-portrait.png")
    .preload("rogue-idle", "media/images/characters/rogue-idle.png");


export default class Rogue extends Player {

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


Rogue.CHARACTER_ID = "rogue";
Rogue.SPEED = 500;
Rogue.POWER = 100;
Rogue.SPELL = "Swap positions";
Rogue.IMAGE_IDLE = "rogue-idle";
Rogue.IMAGE_PORTRAIT = "rogue-portrait";