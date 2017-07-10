import { Scene } from "sideral/Module";
import { Assets, Enum } from "sideral/Tool";
import { Particles } from "sideral/Entity";

import Ball from "./../Ball";
import Goal from "./../Goal";
import tilemapGrass from "./../tilemaps/grass.json";
import fireConfig from "./../particles/flame.json"

// Preload
Assets.preloadTilemap(tilemapGrass)
    .preload("fire", "images/particles/fire.png")
    .preloadSound("goal", "sounds/goal.mp3")
    .preloadSound("explosion", "sounds/explosion.mp3")
    .preloadSound("battleTheme", "sounds/battleTheme.mp3");


/**
 * The arena class (extended from Scene)
 */
export default class Arena extends Scene {

    /* LIFECYCLE */

    constructor() {
        super();

        /**
         * List of all signals bound
         */
        this.signalsBound = [];

        /**
         * The position of the player spawn in x axis
         */
        this.spawnX = 100;
    }

    initialize (props) {
        super.initialize(props);

        this.setTilemap(tilemapGrass);
        this.enablePhysics(50);

        const { player1Character, player2Character } = this.context;

        this.ball           = this.spawn(new Ball_1.Ball(), 100, 100);
        this.goalLeft       = this.spawn(new Goal_1.Goal(), 0, 448 - 130);
        this.goalRight      = this.spawn(new Goal_1.Goal(), this.props.width - 45, 448 - 130, { flip: true });
        this.playerLeft     = this.spawn(new player1Character(), this.spawnX, 320, { player1: true, playerLeft: true });
        this.playerRight    = this.spawn(new player2Character(), this.props.width - this.spawnX - 150, 320, { player2: true, playerRight: true });
        this.score          = this.spawn(new Module_1.Text(), this.props.width / 2, 10, {
            text: "0 - 0",
            fill: "white",
            stroke: "black",
            strokeThickness: 4
        });

        this.flameParticles = this.add(new Entity_1.Particles(), {
            images: ["bolt", "fire"],
            config: fireConfig,
            autoRun: false
        });

        Assets.getSound().playMusic("battleTheme", true);

        const keyboard = this.context.game.keyboard;

        // signals
        this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.Q, pressed => this.playerLeft && this.playerLeft.moveLeft(pressed)));
        this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.D, pressed => this.playerLeft && this.playerLeft.moveRight(pressed)));
        this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.Z, pressed => this.playerLeft && this.playerLeft.jump(pressed)));
        this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.SPACE, pressed => pressed && this.playerLeft && this.playerLeft.attack()));

        if (!this.context.player2IsCpu) {
            this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.ARROW_LEFT, pressed => this.playerRight && this.playerRight.moveLeft(pressed)));
            this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.ARROW_RIGHT, pressed => this.playerRight && this.playerRight.moveRight(pressed)));
            this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.ARROW_UP, pressed => this.playerRight && this.playerRight.jump(pressed)));
            this.signalsBound.push(keyboard.signals.keyChange.bind(Enum.KEY.ENTER, pressed => pressed && this.playerRight && this.playerRight.attack()));
        }
    }


    /* METHODS */

    /**
     * When there is a new goal
     * @param goalSide - The goal
     */
    goal (goalSide) {
        this.shake(50);
        this.flameParticles.position(this.ball.props.x + (goalSide.props.flip ? this.ball.props.width + 20 : -20), this.ball.props.y + (this.ball.props.height / 2));
        this.flameParticles.run();

        this.props.motionFactor = 0.25;

        const playerWon = goalSide.props.flip ? this.playerLeft : this.playerRight,
            sound       = Assets.getSound();

        sound.play("explosion");
        sound.play("goal");

        playerWon.props.score++;
        this.score.props.text = `${this.playerLeft.props.score} - ${this.playerRight.props.score}`;

        this.timers.addTimer("goal", 500, () => {
            this.props.motionFactor = 1;
            this.ball.respawn();
            this.flameParticles.stop();
        });
    }
}
