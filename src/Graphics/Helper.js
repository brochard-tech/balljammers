import { Graphic } from "sideral/Graphic";
import { Color } from "sideral/Tool";


export default class Helper extends Graphic {

    /* LIFECYCLE */

    constructor () {
        super();

        this.setProps({
            width: 0,
            height: 20
        });

        this.signals.propChange.bind("title", this.onTitleChange.bind(this));
        this.signals.propChange.bind("text", this.onTextChange.bind(this));
    }

    initialize (props) {
        super.initialize(props);

        if (!this.props.width) {
            this.props.width = this.context.scene.props.width;
        }

        this.shape("shape", {
            width: this.props.width,
            height: this.props.height,
            fill: Tool_1.Color.black,
            stroke: Tool_1.Color.cyan400,
            fillAlpha: 0.7
        });

        this.onTextChange();
        this.onTitleChange();
    }


    /* EVENTS */

    onTitleChange () {
        if (this.props.title) {
            this.shape("shape-title", {
                y: -20,
                fill: Tool_1.Color.cyan400,
                height: 20,
                width: 50
            }).text("text-title", {
                x: 5,
                y: -19,
                text: this.props.title,
                fill: Tool_1.Color.white,
                fontSize: 14
            });

        } else {
            this.removeGraphic("shape-title").removeGraphic("text-title");
        }
    }

    onTextChange () {
        if (this.props.text) {
            this.text("text", {
                x: 10,
                y: 2,
                text: this.props.text,
                fill: Tool_1.Color.white,
                fontSize: 12
            });

        } else {
            this.removeGraphic("text");
        }
    }
}