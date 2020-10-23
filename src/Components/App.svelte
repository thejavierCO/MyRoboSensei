<script>
    import Cfg from "../js/CreateWordClass"
    import World from "./World2D/setWorld.svelte";
    function cfg({detail:a}){
        a.setColorBg("#fff");
        let {Entity,Render} = Cfg;
        let Pointer = new Entity("Pointer",[0,0],[
            [0,0],
            [30,0],
            [0,30]
        ]);
        Pointer.color = "black"
        let Obj = new Entity("Obj",[100,100],[
            [5,5],
            [100,50],
            [50,100],
            [10,90]
        ]);
        Obj.color = "red";
        let view = new Render(a);
        view.Entity = [
            Pointer,
            Obj
        ]
        view.Event = {
            type:"mousemove",
            callback:(a,b,c)=>{
                let {offsetX:x,offsetY:y} = a;
                let Pointer = b("Pointer")
                Pointer.posicion = [x,y];
                c(({Obj,data})=>{
                    let {posicion:{x:Px,y:Py}} = Obj;
                    let {overlapV:{x:Vx,y:Vy}} = data;
                    Obj.posicion = [Px += Vx,Py += Vy]
                 })
            }
        }
        view.loop();
    }
</script>

<World 
width="{900}" 
height="{900}"
on:getWord={cfg}
/>

<style>
</style>