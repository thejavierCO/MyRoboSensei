<script>
    import EspecialTag from "./tools/especialTag.svelte";
    import {onMount,createEventDispatcher} from "svelte";
    let setEvent = createEventDispatcher();
    import Phaser from "phaser";
    export let width = 300;
    export let height = 300;
    export let title = "";
    let preload=()=>typeof $$restProps.preload === "function"?$$restProps.preload:setEvent("error",{error:{msg:"not defined preload"}}),
        create=()=>typeof $$restProps.create === "function"?$$restProps.create:setEvent("error",{error:{msg:"not defined create"}}),
        update=()=>(()=>{
            setEvent("error",{error:{msg:"not defined update"}})
            return ()=>{};
        })();
    export let setEscene = ()=>({preload,create,update:update()})

    let canvas;
    let testing = ({detail:a})=>{
        a.width = width;
        a.height = height;
        canvas = a;
    }
    onMount(()=>{
        setEvent("mount",this);
        if(typeof setEscene === "function"){
            let getEscenes = setEscene(Phaser);
            if(typeof getEscenes === "object"&&getEscenes.length<0){
                setEvent("error",{error:{mag:"setEscene not return object"}})
                getEscenes = {
                    preload,
                    create,
                    update
                }
            }
            let config = {
                type: Phaser.CANVAS,
                canvas,
                context:canvas.getContext("2d"),
                width,
                height,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 200 }
                    }
                },
                trasparent:true,
                scene:getEscenes
            };
            title!==""?config.title = title:"";
            console.log(Phaser.Game(config))
        }else{
            setEvent("error",{error:{mag:"require funcion setEscene"}})
        }
    })
</script>

<EspecialTag
nameTag="EspecilaTagPhaser"
id="world"
typeTag="canvas"
on:mount={testing}/>