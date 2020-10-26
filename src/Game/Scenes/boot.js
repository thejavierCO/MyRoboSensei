import SVG from "!!raw-loader!../../assets/SVG/logo.svg";
import {Scene} from "phaser";
export default class Main extends Scene{
    constructor(){
        super({key:"Main"});
    }
    preload(){
        this.load.on("complete",(a)=>{
            this.scene.start("Run");
        })
        this.load.svg("logo",URL.createObjectURL((new Blob([SVG],{type:"application/svg+xml"}))));
    }
}