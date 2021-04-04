import getLoad , {StringToArray} from "./getLoad";
export default class Control{
    constructor(id="content",scene=[]){
        this.config = {
            parent:StringToArray(id).filter(e=>!/(#)/.test(e)).join(""),
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
            }else{
                data.parent = tag;
            }
            return data;
        })
    }
}