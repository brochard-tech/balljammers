import { Assets } from "sideral/Tool";

import Player from "./../../Players";


Assets.preload("cat", "media/images/characters/cat.png")
    .preload("cat-portrait", "media/images/characters/cat-portrait.png")
    .preload("cat-idle", "media/images/characters/cat-idle.png");

export default class Cat extends Player {

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

Cat.CHARACTER_ID = "cat";
Cat.SPEED = 250;
Cat.POWER = 300;
Cat.SPELL = "Teleports behind the ball";
Cat.IMAGE_IDLE = "cat-idle";
Cat.IMAGE_PORTRAIT = "cat-portrait";