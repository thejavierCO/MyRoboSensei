import logo from "../../assets/SVG/logo.svg";
import Cart from "../../assets/SVG/Cart_SVG.svg";
import {Scene} from "phaser";
export default class Main extends Scene{
    constructor(){
        super({key:"Main"});
    }
    preload(){
        this.load.on("complete",()=>{
            this.scene.start("Run");
        })
        this.load.svg("logo",logo);
        this.load.svg("cart",Cart);
    }
}