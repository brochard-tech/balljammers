import { Dialog } from "sideral/Graphic";


export default class Dialogs extends Graphic_1.Dialog {

    /* LIFECYCLE */

    constructor() {
        super();

        this.setProps({
            opacity: 0,
            centerScreen: true
        });
    }


    /* EVENTS */

    updatePositionByScene() {
        const scene = this.context.scene, width = scene.props.width, height = scene.props.height;

        this.setProps({
            x: (width / 2) - (this.props.width / 2),
            y: (height / 2) - (this.props.height / 2)
        });

        this.text("label", (label) => {
            const shape = this.getGraphicItem("shape");
            return {
                x: (shape.props.width / 2) - (label.props.width / 2),
                y: 10
            };
        });
    }
}