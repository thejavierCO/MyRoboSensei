import Player from "../GameObjects/Player"
import {Scene} from "phaser";
export default class Running extends Scene{
    constructor(){
        super({key:"Run"});
    }
    preload(){
        this.physics.add.world.setBounds(0,0,this.sys.game.config.width,this.sys.game.config.height);
        this.physics.world.setBoundsCollision();
        new Player(this,100,100,"logo");
    }
    create(){
    }
    update(){
    }
}