import { Game } from "sideral/SideralObject";
import { Assets } from "sideral/Tool";

import { Intro, SelectCharater, Arena } from "./Scene";
import { Cat } from "./Player";


const game = new Game();

Assets.getSound().mute();

game.context.player1Character   = Cat;
game.context.player2Character   = Cat;
game.context.player2IsCpu       = false;

game.enableKeyboard(true);
game.start(832, 576);

const scene = game.add(new Intro());
// const scene = game.add(new SelectCharater());
// const scene = game.add(new Arena());