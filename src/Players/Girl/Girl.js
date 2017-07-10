import { Assets } from "sideral/Tool";

import Player from "./../../Players";


Assets.preload("girl", "media/images/characters/girl.png")
    .preload("girl-portrait", "media/images/characters/girl-portrait.png")
    .preload("girl-idle", "media/images/characters/girl-idle.png");


export default class Girl extends Player {

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

Girl.CHARACTER_ID = "girl";
Girl.SPEED = 375;
Girl.POWER = 150;
Girl.SPELL = "Reduces the speed";
Girl.IMAGE_IDLE = "girl-idle";
Girl.IMAGE_PORTRAIT = "girl-portrait";