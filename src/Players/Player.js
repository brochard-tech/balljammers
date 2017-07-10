import { Entity } from "sideral/Entity";
import { Graphic } from "sideral/Graphic";
import { Assets, Enum, Color } from "sideral/Tool";

import { PlayerAttackSkill, PlayerAttackHitbox, PlayerDashSkill, PlayerDoubleJumpSkill } from "./../Players";


Assets.preloadSound("jump", "media/sounds/jump.mp3")
    .preloadSound("swish", "media/sounds/swish.wav");


/**
 * The class for players
 */
export default class Player extends Entity {

    /* LIFECYCLE */

    constructor() {
        super();

        /**
         * We group the player to "ALL" to collides from all groups
         */
        this.group = Enum.GROUP.ALL;

        /**
         * We set the type to "solid" to avoid angular velocity and large projection
         */
        this.type = Enum.TYPE.SOLID;

        /**
         * The name of the player class
         */
        this.name = "player";

        /**
         * The current speed factor of the player to determine if it goes to the left or to the right
         */
        this.speedFactor = 0;

        /**
         * The current side of the dash (left or right)
         */
        this.dashSide = 0;

        /**
         * Know if the player has pressed the fall button
         * @readonly
         */
        this.fallPressed = true;

        /**
         * Know if the player can use the double jump
         * @readonly
         */
        this.doubleJump = false;

        /**
         * Know if the player has held the left button
         * @readonly
         */
        this.holdLeft = false;

        /**
         * Know if the player has held the right button
         * @readonly
         */
        this.holdRight = false;

        this.name = "player";

        this.setProps({
            speed: 380,
            powerX: 1000,
            powerY: 700,
            jump: 500,
            score: 0,
            energy: 0
        });

        this.signals.beginCollision.bind("ball", this.onCollisionWithBall.bind(this));
        this.skills.addSkill("attack", new Player_1.PlayerAttackSkill());
        this.skills.addSkill("dash", new Player_1.PlayerDashSkill());
        this.skills.addSkill("doubleJump", new Player_1.PlayerDoubleJumpSkill());
    }

    /**
     * @override
     */
    initialize (props) {
        super.initialize(props);

        const color = this.props.player1 ? Color.green700 : Color.red700, arrow = 4, graphic = this.spawn(new Graphic(), (this.props.width / 2) - 10, -25, {
            width: 20,
            height: 18
        }).shape("shape", {
            fill: color,
            box: null
        }).text("text", {
            x: 10,
            y: 6,
            centered: true,
            text: this.props.player1 ? "P1" : (this.context.player2IsCpu ? "CP" : "P2"),
            fill: Tool_1.Color.white,
            fontSize: 11
        });

        graphic.getGraphicItem("shape").beginFill(color).moveTo(0, 0)
            .lineTo(graphic.props.width, 0).lineTo(graphic.props.width, graphic.props.height - arrow).lineTo((graphic.props.width / 2) + arrow, graphic.props.height - arrow)
            .lineTo(graphic.props.width / 2, graphic.props.height).lineTo((graphic.props.width / 2) - arrow, graphic.props.height - arrow)
            .lineTo(0, graphic.props.height - arrow).lineTo(0, 0).endFill();

        this.signals.propChange.bind("flip", () => graphic.props.flip = this.props.flip);
    }

    /**
     * @override
     */
    update (tick) {
        this.props.vx = this.speedFactor * this.props.speed;

        super.update(tick);
    }

    /**
     * @override
     */
    nextCycle () {
        super.nextCycle();

        this._updateAnimation();

        this.props.vy = 0;
    }


    /* METHODS */

    /**
     * When pressing the key left
     * @param pressed - If it is pressed
     */
    moveLeft (pressed) {
        this.holdLeft = pressed;

        if (pressed && !this.speedFactor) {
            this.speedFactor = -1;
            this.dash(Player.SIDE.LEFT);

        }else if ((pressed && this.speedFactor === 1) || (!pressed && this.speedFactor === -1)) {
            this.speedFactor = 0;

        }else if (!pressed && this.holdRight) {
            this.speedFactor = 1;

        }
    }

    /**
     * When pressing the key right
     * @param pressed - If it is pressed
     */
    moveRight (pressed) {
        this.holdRight = pressed;

        if (pressed && !this.speedFactor) {
            this.speedFactor = 1;
            this.dash(Player.SIDE.RIGHT);

        }else if ((pressed && this.speedFactor === -1) || (!pressed && this.speedFactor === 1)) {
            this.speedFactor = 0;

        }else if (!pressed && this.holdLeft) {
            this.speedFactor = -1;

        }
    }

    /**
     * When pressing the key jump
     * @param pressed - If key is pressed
     */
    jump (pressed) {
        if (pressed) {
            let canJump = false;

            if (this.standing) {
                this.doubleJump = true;
                canJump = true;
                this.props.vy = -Math.abs(this.props.jump);

            }else if (this.doubleJump) {
                this.doubleJump = false;
                canJump = true;
                this.skills.run("doubleJump");

            }

            if (canJump) {
                Assets.getSound().play("jump");
                this.dashSide = null;
                this.fallPressed = false;
            }
        }
    }

    /**
     * When pressing the key attack
     */
    attack() {
        Assets.getSound().play("swish");
        this.skills.run("attack", { follow: this });
    }

    /**
     * Run dash
     * @param side - side of dash
     */
    dash (side) {
        if (this.dashSide === side && !this.skills.isRunning("dash") && !this.timers.isFinished("dash")) {
            this.skills.run("dash", { side: side });

        }else {
            this.dashSide = side;
            this.timers.addTimer("dash", 300, () => this.dashSide = Player.SIDE.NONE);

        }
    }


    /* EVENTS */

    /**
     * When entering in collision with ball
     * @param ball - The ball
     */
    onCollisionWithBall(ball) {
        if (!this.standing
            && this.props.y < ball.props.y
            && this.props.x + this.props.width > ball.props.x
            && this.props.x < ball.props.x + ball.props.width) {

            const centerX = this.props.x + (this.props.width / 2), ballCenterX = ball.props.x + (this.props.width / 2), factor = this.fallPressed ? 1.5 : 0.3;

            switch (true) {
                case centerX < ballCenterX:
                    ball.props.vx = this.props.powerX * factor;
                    break;
                case centerX > ballCenterX:
                    ball.props.vx = this.props.powerX * -factor;
                    break;
                default:
                    ball.props.vx = this.props.powerX * factor * (this.props.flip ? -1 : 1);
                    break;
            }

            ball.props.vy = 0;
        }
    }


    /* PRIVATE */

    /**
     * Update sprite animation
     * @private
     */
    _updateAnimation() {
        if (this.speedFactor) {
            this.props.flip = this.speedFactor === -1;
        }

        if (this.skills.currentSkill) {
            return null;
        }

        if (this.standing) {
            this.sprite.setAnimation(this.speedFactor ? "run" : "idle");

        }else {
            this.sprite.setAnimation("jump");

        }
    }
}

/**
 * The side enumeration
 */
Player.SIDE = { LEFT: -1, RIGHT: 1, NONE: 0 };

/**
 * Number of max energy
 */
Player.MAX_ENERGY = 100;
