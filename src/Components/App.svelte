<script>
    import Cfg from "../js/CreateWordClass";
    import World from "./World2D/setWorld.svelte";
    function cfg({detail:world}){
        let {createEntity} = Cfg;
        let Group = new createEntity("Obj","Testing");
        let Pointer = Group([0,0],[
            [0,0],
            [30,0],
            [30,30],
            [0,30]
        ],"red");
        let Obj = Group([200,200],[
            [0,5],
            [1,4],
            [2,3],
            [1,2],
            [2,1],
            [3,1],
            [4,2],
            [5,3],
            [4,4]
        ],"blue");

        Pointer.name = "Pointer";
        Pointer.color="green";
        Obj.name = "Obj";
        console.log(Pointer.area);
        world.color = "#fff";
        world.Entity = Pointer;
        world.Entity = Obj;

        world.on("Colicion",(a)=>{
            console.log(a);
            world.color = "#000";
        });

        // world.on("Hover",(a,b,c)=>{
        //     world.color = "#fff";
        //     let {offsetX:x,offsetY:y} = c;
        //     Pointer.setPosicion(x,y);
        // });
        
        // world.on("Hover",(a,b,c,{offsetX,offsetY})=>{
        //     console.log(c.isPointInPath(offsetX, offsetY));
        // });

        world.on("ClickInEntity",(a,b,c)=>{
            console.log(a,b,c)
        })
        world.render();
        // a.setColorBg("#fff");
        // let {EntityObj:Entity,Render} = Cfg;
        // let Pointer = new Entity("Pointer",[0,0],[
        //     [0,0],
        //     [30,0],
        //     [0,30]
        // ]);
        // Pointer.color = "black";
        // console.log(Pointer.posicion);
        // let Obj = new Entity("Obj",[200,200],[
        //     [5,5],
        //     [100,50],
        //     [50,100],
        //     [10,90]
        // ]);
        // Obj.color = "red";
        // let view = new Render(a);
        // view.Entity = [
        //     Pointer,
        //     Obj
        // ]
        // view.Event = {
        //     type:"mousemove",
        //     callback:(a,b,c)=>{
        //         let {offsetX:x,offsetY:y} = a;
        //         let Pointer = b("Pointer")
        //         Pointer.posicion = [x,y];
        //         c(({Obj,Res})=>{
        //             // let {posicion:{x:Px,y:Py}} = Obj;
        //             // let {overlapV:{x:Vx,y:Vy}} = Res;
                    
        //             console.log(Obj)
        //             // Obj.posicion = [Px -= Vx,Py -= Vy]
        //             // Obj.Color = Pointer.Color
        //          })
        //     }
        // }
        // view.loop();
    }
</script>

<World 
width="{900}" 
height="{900}"
on:getWord={cfg}
/>

<style>
</style>