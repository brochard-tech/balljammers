import { Scene, Sprite } from "sideral/Module";
import { Button } from "sideral/Graphic";
import { Assets, Color } from "sideral/Tool";

import { SelectCharater } from "./../Scene";
import { DialogOptions } from "./../Dialog"; 


Assets.preload("title-full", "media/images/titlescreen-full.png")
    .preload("title-ball", "media/images/titlescreen-ball.png")
    .preload("title-balljammers", "media/images/titlescreen-balljammers.png")
    .preloadSound("mainTheme", "media/sounds/mainTheme.mp3")
    .preloadSound("click", "media/sounds/click.wav");


export default class Title extends Scene {

    /* LIFECYCLE */

    /**
     * @override
     */
    initialize(props) {
        super.initialize(props);

        Assets.getSound().playMusic("mainTheme", true);

        const midWidth = this.props.width / 2, midHeight = this.props.height / 2;

        this.props.backgroundColor  = Color.black;
        this.background             = this.add(new Sprite(), {
            width: this.props.width,
            height: this.props.height,
            imageId: "title-full"
        });

        this.buttonPlay1 = this.spawn(new Button(), midWidth - 75, this.props.height - 225, {
            width: 200,
            height: 50
        }).text("label", {
            text: "Play - 1 player"
        });

        this.buttonPlay2 = this.spawn(new Button(), midWidth - 75, this.props.height - 150, {
            width: 200,
            height: 50
        }).text("label", {
            text: "Play - 2 players"
        });

        this.buttonOptions = this.spawn(new Button(), midWidth - 75, this.props.height - 75, {
            width: 200,
            height: 50
        }).text("label", {
            text: "Options"
        });

        this.dialogOptions = this.add(new DialogOptions());

        this.buttonPlay1.signals.click.add(() => this.onClickPlay());
        this.buttonPlay2.signals.click.add(() => this.onClickPlay(true));
        this.buttonOptions.signals.click.add(() => {
            Tool_1.Assets.getSound().play("click");
            this.showOptions();
        });
    }


    /* METHODS */

    getButtons () {
        return [this.buttonOptions, this.buttonPlay1, this.buttonPlay2];
    }

    showOptions() {
        this.getButtons().forEach(button => button.hide());
        this.dialogOptions.show();
    }

    hideOptions() {
        this.dialogOptions.hide();
        this.getButtons().forEach(button => button.show());
    }


    /* EVENTS */

    /**
     * On click on button play
     * @params twoPlayers - If true, we set the mode for 2 physicals players
     */
    onClickPlay(twoPlayers = false) {
        Assets.getSound().play("click");

        this.context.game.context.twoPlayers = twoPlayers;
        this.context.game.swapScene(this, new SelectCharater());
    }

}
