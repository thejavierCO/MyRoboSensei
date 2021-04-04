import {GameObjects} from "phaser";
export default class RobotCar extends GameObjects.Image{
    constructor(Scene,texture){
        super(Scene,0,0,texture);
        Scene.add.existing(this,true);
        Scene.registry.set("setPositionPorcentaje",this.setPosition);
        this.getPosicionForPorcentaje = this.setPosition;
        let {w,h} = this.setPosition(50,50);this.x = w;this.y = h;
        Scene.matter.add.gameObject(this);
        this.setBounce(0.2);
        this.setScale(0.5);
    }
    setPosition(p0=100,p1=100){
        let {width,height} = this.scene.sys.game.config;
        let w = ((p0||p1)*width)/100, h = ((p1||p0)*height)/100;
        return {w,h};
    }
}