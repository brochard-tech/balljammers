import { Skill } from "sideral/Entity";
import { Sprite } from "sideral/Module";
import { Assets } from "sideral/Tool";


export default class PlayerDoubleJumpSkill extends Skill {

    /* LIFECYCLE */

    constructor() {
        super();

        this.duration = 300;
        this.angleFactor = 360 / (this.duration * 0.001);
        this.signals.skillStart.add(this.onSkillStart.bind(this));
        this.signals.skillUpdate.add(this.onSkillUpdate.bind(this));
        this.signals.skillComplete.add(this.onSkillComplete.bind(this));
    }


    /* EVENTS */

    /**
     * When skill starts
     */
    onSkillStart() {
        this.owner.context.scene.add(new Sprite(), {
            imageId: "smoke",
            width: 128,
            height: 128,
            x: this.owner.props.x + (this.owner.props.width / 2) - 64,
            y: this.owner.props.y + (this.owner.props.height / 2) - 64,
            autoKill: true
        }).addAnimation("idle", 25, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1);

        Assets.getSound().play("dash");

        this.owner.props.vy = -Math.abs(this.owner.props.jump);
    }

    /**
     * When skill updates
     */
    onSkillUpdate (tick) {
        const nextAngle = this.angleFactor * tick;
        this.owner.props.angle += this.owner.props.flip ? -nextAngle : nextAngle;
        if (this.owner.props.angle > 360) {
            this.owner.props.angle = 360;
        }
    }

    onSkillComplete () {
        this.owner.props.angle = 0;
    }
}
