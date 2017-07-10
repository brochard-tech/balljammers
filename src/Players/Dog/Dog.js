import { Assets } from "sideral/Tool";

import Player from "./../../Players";


Assets.preload("dog", "media/images/characters/dog.png")
    .preload("dog-portrait", "media/images/characters/dog-portrait.png")
    .preload("dog-idle", "media/images/characters/dog-idle.png");


export default class Dog extends Player {

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

Dog.CHARACTER_ID = "dog";
Dog.SPEED = 175;
Dog.POWER = 350;
Dog.SPELL = "Move the ball into the cages";
Dog.IMAGE_IDLE = "dog-idle";
Dog.IMAGE_PORTRAIT = "dog-portrait";