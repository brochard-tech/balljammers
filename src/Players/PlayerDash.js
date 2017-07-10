import { Skill } from "sideral/Entity";
import { Sprite } from "sideral/Module";
import { Assets } from "sideral/Tool";

import Player from "./../Players";


Assets.preload("smoke", "media/images/effects/smoke.png")
    .preloadSound("dash", "media/sounds/dash.wav");


export default class PlayerDashSkill extends Skill {

    /* LIFECYCLE */

    /**
     * @constructor
     */
    constructor() {
        super();

        this.side = Player.SIDE.NONE;
        this.movable = false;
        this.duration = 100;
        this.reload = 750;

        this.signals.skillStart.add(this.onSkillStart.bind(this));
        this.signals.skillUpdate.add(this.onSkillUpdate.bind(this));
        this.signals.skillComplete.add(this.onSkillComplete.bind(this));
    }


    /* EVENTS */

    /**
     * When skill starts
     * @returns {void}
     */
    onSkillStart () {
        const flip = this.owner.props.flip;

        Assets.getSound().play("dash");

        this.owner.context.scene.add(new Sprite(), {
            imageId: "smoke",
            width: 128,
            height: 128,
            debug: true,
            x: this.owner.props.x + (this.owner.props.width / 2) - 64,
            y: this.owner.props.y + (this.owner.props.height / 2) - 64,
            autoKill: true,
            flip: flip
        }).addAnimation("idle", 25, [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], 1);
    }

    /**
     * When skill updates
     */
    onSkillUpdate() {
        this.owner.props.vx = this.owner.props.speed * (this.side === Player.SIDE.LEFT ? -3 : 3);
        this.owner.props.vy = 0;
    }

    /**
     * When skill is complete
     */
    onSkillComplete() {
        this.owner.dashSide = Player.SIDE.NONE;
    }
}