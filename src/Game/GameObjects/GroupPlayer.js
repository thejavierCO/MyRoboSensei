import {GameObjects} from "phaser"
let {Container,Group} = GameObjects;
export default class PlayerBlock extends Container{
    constructor(Scene){
        super(Scene);
        let {w,h} = this.setPosition(50,50);
        Scene.add.existing(this,true);
        let CartPC = Scene.add.image(0,0,"Cart_Parachoques");
        let CartBody = Scene.add.image(w-10,h-10,"Cart_body");
        let CartLlA = Scene.add.image(w+10,h+10,"Cart_LlantaA");
        let CartLlB = Scene.add.image(0,0,"Cart_LlantaB");
        this.add([
            CartBody,
            CartLlA,
            CartLlB,
            CartPC
        ])
        this.iterate(e=>{
            e.setOrigin(0,0);
            e.setScale(10);
            // Scene.matter.add.gameObject(e);
        })
    }
    setPosition(p0=100,p1=100){
        let {width,height} = this.scene.sys.game.config;
        let w = ((p0||p1)*width)/100, h = ((p1||p0)*height)/100;
        return {w,h};
    }
}