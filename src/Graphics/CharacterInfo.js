import { Graphic } from "sideral/Graphic";
import { Sprite } from "sideral/Module";
import { Assets, Color } from "sideral/Tool";


Assets.preload("icon-speed", "media/images/icon-speed.png")
    .preload("icon-power", "media/images/icon-power.png")
    .preload("icon-spell", "media/images/icon-spell.png");


export default class CharacterInfo extends Graphic {

    /* LIFECYCLE */

    constructor () {
        super();

        /**
         * The max speed
         * @readonly
         */
        this.MAX_SPEED = 500;

        /**
         * The max power
         * @readonly
         */
        this.MAX_POWER = 500;

        this.SPEED_COLOR = Color.lightGreen700;
        this.POWER_COLOR = Color.amber700;
        this.SPELL_COLOR = Color.purple700;

        this.setProps({
            power: 0,
            speed: 0,
            spell: "",
            width: 250,
            height: 250
        });

        this.signals.propChange.bind("imageId", () => this.sprite.props.imageId = this.props.imageId);
        this.signals.propChange.bind(["power", "speed", "spell"], this.onInfoChange.bind(this));
    }

    initialize (props) {
        super.initialize(props);

        this.sprite = this.spawn(new Module_1.Sprite(), this.props.width / 2, (this.props.height - 48) / 2, {
            spritesheet: false,
            flip: this.props.spriteFlip
        });

        this.addBar(10, this.props.height - 120, "icon-speed", this.SPEED_COLOR, "SPEED");
        this.addBar(10, this.props.height - 80, "icon-power", this.POWER_COLOR, "POWER");
        this.addBar(10, this.props.height - 40, "icon-spell", this.SPELL_COLOR, "SPELL", true);
    }


    /* METHODS */

    addIcon (x, y, imageId, strokeColor) {
        this.shape(imageId, {
            x: x,
            y: y,
            width: 28,
            height: 28,
            fill: Tool_1.Color.white,
            stroke: strokeColor,
            strokeThickness: 2,
            box: Tool_1.Enum.BOX.CIRCLE
        });

        this.spawn(new Sprite(), x + 14, y + 14, {
            spritesheet: false,
            imageId: imageId
        });
    }

    addBar (x, y, imageId, color, title, withText = false) {
        this.addIcon(x, y, imageId, color);
        this.shape(imageId + "-bar", {
            x: x + 40,
            y: y + 10,
            width: this.props.width - 70,
            box: null,
            height: 15
        }).shape(imageId + "-title-shape", {
            x: x + 40,
            y: y,
            width: 70,
            box: null,
            fill: color,
            height: 10
        }).text(imageId + "-title-text", {
            x: x + 55,
            y: y - 3,
            text: title,
            fill: Tool_1.Color.white,
            fontSize: 11
        });

        if (withText) {
            this.text(imageId + "-text", {
                x: x + 50,
                y: y + 10,
                fill: Tool_1.Color.white,
                fontSize: 11
            });

        } else {
            this.shape(imageId + "-fill", {
                x: x + 40,
                y: y + 10,
                width: 0,
                box: null,
                height: 15
            });

            const fillBar = this.getGraphicItem(imageId + "-fill");

            this.drawBar(fillBar.beginFill(color));
        }

        const bar = this.getGraphicItem(imageId + "-bar"), titleShape = this.getGraphicItem(imageId + "-title-shape");

        this.drawBar(bar.beginFill(Tool_1.Color.black, 0.8).lineStyle(2, color));
        this.drawBar(titleShape.beginFill(color));
    }

    drawBar (bar) {
        bar.moveTo(0, 0).lineTo(bar.props.width, 0).lineTo(bar.props.width + 10, bar.props.height).lineTo(10, bar.props.height).lineTo(0, 0);
    }


    /* EVENTS */

    onInfoChange () {
        const fillbarSpeed = this.getGraphicItem("icon-speed-fill"), fillbarPower = this.getGraphicItem("icon-power-fill"), spellText = this.getGraphicItem("icon-spell-text"), maxWidth = this.props.width - 70;

        fillbarSpeed.props.width = (this.props.speed / this.MAX_SPEED) * maxWidth;
        fillbarPower.props.width = (this.props.power / this.MAX_POWER) * maxWidth;
        spellText.props.text = this.props.spell;

        this.drawBar(fillbarSpeed.clear().beginFill(this.SPEED_COLOR));
        this.drawBar(fillbarPower.clear().beginFill(this.POWER_COLOR));
    }
}