import { Entity } from "sideral/Entity";
import { Assets } from "sideral/Tool";

Assets.preload("goal", "images/goal.png");

/**
 * The goal class
 */
export default class Goal extends Entity {

    /* LIFECYCLE */

    constructor() {
        super();

        this.name = "goal";

        this.setProps({
            type: Tool_1.Enum.TYPE.STATIC,
            width: 45,
            height: 130
        });
    }

    initialize(props) {
        super.initialize(props);
        this.addSprite("goal", this.props.width, this.props.height);
    }
}
