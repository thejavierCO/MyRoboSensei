import Player from "../GameObjects/Player"
import {Scene} from "phaser";
export default class Running extends Scene{
    constructor(){
        super({key:"Run"});
    }
    preload(){
        this.matter.world.setBounds(0,0,this.sys.game.config.width,this.sys.game.config.height);
        let cart = new Player(this,"cart");
        console.log(cart)
    }
    create(){
        this.input.enableDebug = true;
    }
    update(){
    }
}