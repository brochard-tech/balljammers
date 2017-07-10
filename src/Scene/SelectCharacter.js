import { Scene, Sprite } from "sideral/Module";
import {} from "sideral/Graphic";
import { Assets, Color, Enum } from "sideral/Tool";

import {  } from "./../Scene";
import { CharacterInfo, Helper, Portrait } from "./../Graphics";
import { Player, Cat, Dog, Girl, Rogue, Robot, Stark } from "./../Players";


Assets.preload("title", "media/images/titlescreen.png")
    .preload("selectCharacter", "media/images/selectCharacter.png")
    .preload("vs", "media/images/vs.png")
    .preloadSound("move", "media/sounds/move.wav")
    .preloadSound("selectCharacter", "media/sounds/selectCharacter.mp3");


export default class SelectCharater extends Scene {

    /* LIFECYCLE */

    constructor() {
        super();

        /**
         * List of portraits
         */
        this.portraits      = [];

        this.signalsBound   = [];

        /**
         * The portrait selected by the player 1
         */
        this.player1 = 0;

        /**
         * The portrait selected by the player 2
         */
        this.player2 = 0;

        /**
         * Player enumeration
         */
        this.PLAYER = {
            PLAYER_1: "player1",
            PLAYER_2: "player2"
        };

        this.Characters = [Cat, Dog, Rogue, Girl, Robot, Stark];
    }


    /* LIFECYCLE */

    initialize (props) {
        super.initialize(props);

        const x = (this.props.width / 2) - (((this.Characters.length * 72) + 20) / 2), y = this.props.height - 132;

        this.spawnMultiple([
            { item: new Sprite(), props: { width: this.props.width, height: this.props.height, imageId: "title" } },
            { item: new Sprite(), x: this.props.width / 2, y: 50, props: { spritesheet: false, imageId: "selectCharacter" } },
            { item: new Sprite(), x: this.props.width / 2, y: (this.props.height / 2) - 50, props: { spritesheet: false, imageId: "vs" } }
        ]);

        this.addGraphic(10, 125, 250, 250, "Player 1").text("text", {
            fill: Tool_1.Color.green400
        });

        this.addGraphic(this.props.width - 260, 125, 250, 250, this.context.twoPlayers ? "Player 2" : "CPU").text("text", {
            fill: Tool_1.Color.red400
        });

        this.spawnMultiple([
            { item: new CharacterInfo(), x: 10, y: 125, assign: "characterInfo1" },
            { item: new CharacterInfo(), x: this.props.width - 260, y: 125, props: { spriteFlip: true }, assign: "characterInfo2" },
            { item: new Helper(), x: 0, y: this.props.height - 30, props: {
                    title: "help",
                    text: this.context.twoPlayers
                        ? "Use 'q' or 'd' (P1) or arrow keys (P2) to select a character. Press 'space' (P1) or 'enter' (P2) to validate your character."
                        : "Use 'q' or 'd' to select a character. Press 'space' to validate your character."
                } }
        ]);

        this.addGraphic((this.props.width / 2) - 236, this.props.height - 152, 452, 92);

        this.buttonBack = this.spawn(new Button(), 10, y + 1, {
            width: 115,
            height: 50
        }).text("label", {
            text: "Back"
        });

        this.buttonPlay = this.spawn(new Button(), this.props.width - 125, y + 1, {
            width: 115,
            height: 50
        }).text("label", {
            text: "FIGHT !"
        });

        this.portraits = this.Characters.map((Character, index) => {
            return this.spawn(new Portrait(), x + 10 + (72 * index), y, {
                imageId: Character.IMAGE_PORTRAIT,
                characterId: Character.CHARACTER_ID
            });
        });

        this.portraits[0].props.player1 = true;
        this.portraits[0].props.player2 = this.context.twoPlayers;

        Assets.getSound().playMusic("selectCharacter", true);

        const keyboard = this.context.game.keyboard;

        this.buttonBack.signals.click.add(this.onButtonBackClick.bind(this));
        this.buttonPlay.signals.click.add(this.onButtonPlayClick.bind(this));
        this.signalsBound.push(keyboard.signals.keyPress.bind(Enum.KEY.Q, () => this.movePlayerPortrait(this.PLAYER.PLAYER_1, true)));
        this.signalsBound.push(keyboard.signals.keyPress.bind(Enum.KEY.D, () => this.movePlayerPortrait(this.PLAYER.PLAYER_1, false)));

        if (this.context.twoPlayers) {
            this.signalsBound.push(keyboard.signals.keyPress.bind(Tool_1.Enum.KEY.ARROW_LEFT, () => this.movePlayerPortrait(this.PLAYER.PLAYER_2, true)));
            this.signalsBound.push(keyboard.signals.keyPress.bind(Tool_1.Enum.KEY.ARROW_RIGHT, () => this.movePlayerPortrait(this.PLAYER.PLAYER_2, false)));
            this.showCharacterInfo(this.PLAYER.PLAYER_2, this.Characters[0]);

        } else {
            this.showCharacterInfo(this.PLAYER.PLAYER_2, this.Characters[Math.floor(Math.random() * (this.Characters.length - 1))]);

        }

        this.showCharacterInfo(this.PLAYER.PLAYER_1, this.Characters[0]);
    }

    kill () {
        super.kill();

        const keyboard = this.context.game.keyboard;
        this.signalsBound.forEach(signalBinding => keyboard.signals.keyPress.remove(signalBinding.getListener()));
    }


    /* METHODS */

    /**
     * Switch a character of a player
     * @param player - Player enumeration
     * @param moveLeft - If true, move the portrait to the left. Right if false
     */
    movePlayerPortrait(player, moveLeft) {
        const maxIndex  = this.portraits.length - 1, currentIndex = this[player];
        let nextIndex   = moveLeft ? this[player] - 1 : this[player] + 1;

        if (nextIndex < 0) {
            nextIndex = maxIndex;

        }else if (nextIndex > maxIndex) {
            nextIndex = 0;

        }

        Assets.getSound().play("move");

        this.portraits[currentIndex].props[player] = false;
        this.portraits[nextIndex].props[player] = true;
        this[player] = nextIndex;

        this.showCharacterInfo(player, this.Characters[nextIndex]);
    }

    /**
     * Show the info a character by its portrait
     * @param player - Player side to show the info
     * @param portrait - Portrait corresponding to the character
     */
    showCharacterInfo (player, Character) {
        const characterInfo = player.indexOf("1") != -1 ? this.characterInfo1 : this.characterInfo2;

        characterInfo.props.imageId = Character.IMAGE_IDLE;
        characterInfo.props.speed = Character.SPEED;
        characterInfo.props.power = Character.POWER;
        characterInfo.props.spell = Character.SPELL;
    }

    /**
     * Add a new graphic shape
     * @param x - Position in x axis
     * @param y - Position in y axis
     * @param width - Width of the shape
     * @param height - Height of the shape
     * @param text - Text to display on the shape
     * @return The graphic created
     */
    addGraphic (x, y, width, height, text) {
        const graphic = this.spawn(new Graphic_1.Graphic(), x, y, {
            activable: false
        }).shape("shape", {
            width: width,
            height: height,
            fill: Tool_1.Color.black,
            fillAlpha: 0.8,
            stroke: Tool_1.Color.cyan400,
            strokeThickness: 2
        });

        if (text) {
            graphic.text("text", {
                x: width / 2,
                y: -20,
                centered: true,
                text: text,
                fill: Tool_1.Color.white
            });
        }

        return graphic;
    }


    /* EVENTS */

    /**
     * On click on button back
     */
    onButtonBackClick() {
        Assets.getSound().play("click");

        this.context.game.swapScene(this, new Scenes_1.Title());
    }

    /**
     * On click on button play
     */
    onButtonPlayClick() {
        Assets.getSound().play("click");

        this.context.game.swapScene(this, new Scenes_1.Arena());
    }
}