import { Switch, Button } from "sideral/Graphic";
import { Color, Assets } from "sideral/Tool";

import Dialogs from "./../Dialogs";


export default class DialogOptions extends Dialogs {

    /* LIFECYCLE */

    constructor() {
        super();

        this.setProps({
            width: 200,
            height: 300
        });
    }

    initialize (props) {
        super.initialize(props);

        this.text("label", {
            text: "OPTIONS"
        });

        this.switchMusic = this.spawn(new Switch(), 20, 80).text("label", {
            text: "Music"
        }).active();

        this.switchSound = this.spawn(new Switch(), 20, 110).text("label", {
            text: "Sounds"
        }).active();

        this.buttonValid = this.spawn(new Button(), (this.props.width / 2) - 50, this.props.height - 60, {
            width: 100,
            height: 40
        }).text("label", {
            text: "Done"
        });

        this.switchMusic.signals.click.add(this.onStateMusicChange.bind(this));
        this.switchSound.signals.click.add(this.onStateSoundChange.bind(this));
        this.buttonValid.signals.click.add(this.onButtonValidClick.bind(this));
    }


    /* EVENTS */

    /**
     * On click on button valid
     */
    onButtonValidClick() {
        Assets.getSound().play("click");
        this.context.scene.hideOptions();
    }

    /**
     * On click on switch Music
     */
    onStateMusicChange() {
        Assets.getSound().play("click");

        if (this.switchMusic.state === Tool_1.Enum.STATE.ACTIVE) {
            Assets.getSound().unmute(true);

        } else {
            Assets.getSound().mute(true);
        }
    }

    /**
     * On click on switch sound
     */
    onStateSoundChange() {
        Assets.getSound().play("click");

        if (this.switchSound.state === Tool_1.Enum.STATE.ACTIVE) {
            Assets.getSound().unmute(false, true);

        } else {
            Assets.getSound().mute(false, true);
        }
    }
}