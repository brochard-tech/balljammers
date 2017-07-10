import { Graphic } from "sideral/Graphic";
import { Color } from "sideral/Tool";


export default class PlayerInfo extends Graphic {

    /* LIFECYCLE */

    /**
     * @override
     */
    constructor() {
        super();

        this.setProps({
            width: 50,
            height: 16
        });
    }

    /**
     * @override
     */
    initialize (props = {}) {
        super.initialize(props);

        const height = 8;

        this.shape("shape", {
            y: this.props.height - height,
            width: this.props.width,
            height: height,
            box: null
        });

        this.getGraphicItem("shape").beginFill(Color.black, 0.7).lineStyle(1, Color.cyan400).moveTo(0, 0)
            .lineTo(this.props.width, 0).lineTo(this.props.width + 10, height).lineTo(10, height).lineTo(0, 0).endFill();
    }

    update (tick) {
        super.update(tick);

        if (this.player) {
            this.props.x = this.player.props.x + (this.player.props.width / 2) - (this.props.width / 2) - 5;
            this.props.y = this.player.props.y - this.props.height - 10;
        }
    }


    /* METHODS */

    setPlayer (player) {
        this.player = player;

        if (!this.player) {
            this.props.visible = false;
            return null;
        }

        const color = this.player.props.player1 ? Tool_1.Color.green700 : Tool_1.Color.red700;

        this.props.visible = true;
        this.shape("shape-name", {
            width: 20,
            height: 8,
            box: null
        }).text("text-name", {
            y: -7,
            x: 10,
            text: this.player.props.player1 ? "P1" : (this.context.player2IsCpu ? "CPU" : "P2"),
            fill: Tool_1.Color.white,
            fontSize: 10
        });

        const shapeName = this.getGraphicItem("shape-name");

        shapeName.beginFill(color).moveTo(0, 0).lineTo(shapeName.props.width, 0)
            .lineTo(shapeName.props.width + 10, shapeName.props.height).lineTo(10, shapeName.props.height).lineTo(0, 0).endFill();

        player.signals.propChange.bind("energy", this.onEnergyChange.bind(this));
    }


    /* EVENTS */

    /**
     * When
     */
    onEnergyChange() {
    }
}