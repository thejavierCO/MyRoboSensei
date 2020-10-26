import {GameObjects} from "phaser";
export default class RobotCar extends GameObjects.Image{
    constructor(Scene,x,y,texture){
        super(Scene,x,y,texture);
        Scene.add.existing(this,true);
        Scene.physics.world.enable(this);
        Scene.registry.set("setPositionPorcentaje",this.setPosition);
        this.getPosicionForPorcentaje = this.setPosition;
        let {w,h} = this.setPosition(50,50);
        this.scale = 0.09;
        this.x = w;
        this.y = h;
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.setInteractive()
        this.on("pointerdown",this.testing)
    }
    setPosition(p0=100,p1=100){
        let {width,height} = this.scene.sys.game.config;
        let w = ((p0||p1)*width)/100;
        let h = ((p1||p0)*height)/100;
        return {w,h};
    }
    testing(a){
        this.setX(a.x)
        this.setY(a.y)
    }
}