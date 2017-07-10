import { Hitbox, Skill } from "sideral/Entity";
import { Sprite } from "sideral/Module";
import { Assets, Enum } from "sideral/Tool";


Assets.preload("strike", "media/images/effects/strike.png");


export class PlayerAttackHitbox extends Hitbox {

    /* LIFECYCLE */

    constructor () {
        super();

        this.setProps({
            width: 20,
            height: 30
        });
    }

    initialize (props) {
        super.initialize(props);

        const owner = this.props.owner;

        Assets.getSound().play("ball");

        this.spawn(new Module_1.Sprite(), owner.props.x + owner.props.width, owner.props.y + (owner.props.height / 2), {
            imageId: "strike",
            autoKill: false
        }).addAnimation("idle", 500, [0, 1, 2]).setAnimation("idle");
    }


    /* EVENTS */

    /**
     * @event hit
     * @override
     */
    onHit (name, other) {
        return name === "ball" ? this.onHitWithBall(other) : false;
    }

    /**
     * On collision with ball
     * @param {Ball} ball: the ball
     * @returns {Boolean} correct hit
     */
    onHitWithBall (ball) {
        const owner = this.props.owner, playerSide = owner.props.x < ball.props.x ? 1 : -1;

        Assets.getSound().play("ball");
        this.spawn(new Module_1.Sprite(), playerSide > 0 ? owner.props.x + owner.props.width : owner.props.x, ball.props.y / 2, {
            imageId: "strike",
            autoKill: true
        }).addAnimation("idle", 500, [0, 1, 2]).setAnimation("idle");

        ball.props.vx = owner.props.powerX * playerSide;
        ball.props.vy = -Math.abs(owner.props.powerY);

        return true;
    }
}


/**
 * The skill to attack the ball
 */
export class PlayerAttackSkill extends Skill {

    constructor() {
        super();

        /**
         * The animation of the owner
         */
        this.animation = "attack";

        /**
         * The duration of the skill
         */
        this.duration = 1;

        /**
         * The type of duration of the skill (we set the time from the duration of the animation
         */
        this.durationType = Enum.DURATION_TYPE.ANIMATION_LOOP;
        /**
         * The hitbox class used when launching this skill
         */
        this.hitboxClass = PlayerAttackHitbox;
    }


    /* METHODS */

    /**
     * @override
     */
    addHitbox (hitboxObject, hitboxProps = {}) {
        hitboxProps.follow = this.owner.beFollowed(false, this.owner.props.width + 5, this.owner.props.height - hitboxObject.props.height, -hitboxObject.props.width - 5);

        return super.addHitbox(hitboxObject, hitboxProps);
    }
}
