<script>
    import ETag from "./tools/especialTag.svelte";
    import Phaser from "Phaser";
    import Loader from "../js/PhaserLoad";
    import {onMount,createEventDispatcher} from "svelte";
    let {width=300,height=300} = $$restProps;
    let Event = createEventDispatcher();
    let control;
    let loadTag = ({detail:{tag:a,query}})=>{
        let {localName} = a;
        a.width = width;
        a.height = height;
        control = new Loader(a,{
            preload:()=>typeof $$restProps.preload === "function"?$$restProps.preload:Event("error",{error:{msg:"not defined preload"}}),
            create:()=>typeof $$restProps.create === "function"?$$restProps.create:Event("error",{error:{msg:"not defined create"}}),
            update:typeof $$restProps.update === "function"?$$restProps.update:(()=>{
                Event("error",{error:{msg:"not defined update"}})
                return ()=>{};
            })
        });
        if(/(canvas)/gi.test(localName)){
            let {parentNode} = document.querySelector(query);
            control.parent = parentNode;
            control.canvas = a;
        }
        console.log([a],query);
        // Event("load",test);
    }
    onMount(()=>{
        // let data = new Loader(element,{
        //     preload:()=>typeof $$restProps.preload === "function"?$$restProps.preload:Event("error",{error:{msg:"not defined preload"}}),
        //     create:()=>typeof $$restProps.create === "function"?$$restProps.create:Event("error",{error:{msg:"not defined create"}}),
        //     update:typeof $$restProps.update === "function"?$$restProps.update:(()=>{
        //         Event("error",{error:{msg:"not defined update"}})
        //         return ()=>{};
        //     })()
        // });
        // data.then(e=>{
        //     console.log(e);
        // })
        // let control = {
        //     type:Phaser.AUTO,
        //     parent:element,
        //     physics:{
        //         default:"arcade",
        //         arcade:{
        //             fps:30,
        //             gravity:{
        //                 x:300
        //             }
        //         }
        //     },
        //     scene:{
        //         preload:()=>typeof $$restProps.preload === "function"?$$restProps.preload:Event("error",{error:{msg:"not defined preload"}}),
        //         create:()=>typeof $$restProps.create === "function"?$$restProps.create:Event("error",{error:{msg:"not defined create"}}),
        //         update:()=>typeof $$restProps.create === "function"?$$restProps.create:(()=>{
        //             Event("error",{error:{msg:"not defined update"}})
        //             return ()=>{};
        //         })()
        //     }
        // }
        // Event("load",control);
    })
</script>

<ETag
nameTag="game_load"
typeTag="canvas"
on:LoadHTMLElement={loadTag}
/>