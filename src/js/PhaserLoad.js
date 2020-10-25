import getLoad from "./getLoad";
export default class Control{
    constructor(id="content",scene=[]){
        this.config = {
            type:Phaser.AUTO,
            parent:id,
            physics:{
                default:"arcade",
                arcade:{
                    fps:30,
                    gravity:{
                        x:300
                    }
                }
            }
        };
        this.config.scene = scene!==[]?scene:{
            preload:()=>console.warn("error",{error:{msg:"not defined preload"}}),
            create:()=>console.warn("error",{error:{msg:"not defined create"}}),
            update:(()=>{
                console.warn("error",{error:{msg:"not defined update"}})
                return ()=>{};
            })()
        };
        let data = this.config;
        return getLoad(document.body,id).then(({tag,query})=>{
            let {localName} = tag
            if(/(canvas)/gi.test(localName)){
                let {parentNode} = document.querySelector(query);
                data.parent = parentNode;
                data.canvas = a;
            }
            return data;
        }).then(e=>({Game:Phaser.Game(e),Phaser}))
    }
}