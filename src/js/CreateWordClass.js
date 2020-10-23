import SAT from "sat";

class lib{
    constructor(){
        this.V = SAT.Vector;
        this.P = SAT.Polygon;
        this.R = SAT.Response;
    }
}

class World{
    constructor(name,canvas,id){
        if(!id){
            id = window.worldid = (!window.worldid?0:window.worldid)+1;
        }
        this.name = name||"testing";
        if(!canvas){
            canvas = document.createElement("canvas");
            canvas.id = "word_"+(id||this.name);
        }
        this.world = canvas;
        this.worldDraw = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.setColorBg = (a)=>this.world.style.backgroundColor = a;
    }
}
class Entity extends lib{
    constructor(name="",posicion,body=[[0,0],[0,0],[0,0]],color="red"){
        super();
        let {0:x=0,1:y=0} = posicion;
        this._color = color;
        this._name = name;
        this._posicion = new this.V(x,y);
        this._body = new this.P(this._posicion,body.map(({0:x,1:y})=>new this.V(x,y)));
        this.colicionWith = (obj,r)=>SAT.testPolygonPolygon(this.body,obj.body,r);
    }
    get name(){
        return this._name;
    }
    set color(a){
        return this._color = a;
    }
    get color(){
        return this._color;
    }
    get body(){
        return this._body;
    }
    set body(a){
        return this._body = new this.P(this.posicion,a.map(({0:x,1:y})=>new this.V(x,y)))
    }
    set posicion(a){
        let {0:x,1:y} = a;
        return this.body.pos = this._posicion = new this.V(x,y);
    }
    get posicion(){
        return this._posicion;
    }
    draw(ctx,color=this.color){
        let {points,pos} = this.body;
        var i = points.length;
        ctx.fillStyle = color;
        ctx.save();
        ctx.translate(pos.x,pos.y);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        while (i--) ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    drawBox(ctx,color=this.color){
        let {points,pos} = this.body;
        var x = points[points.length-1].x;
        var y = points[points.length-1].y
        var min = x > y ? x : y;
        var bounds = {
            x: points[0].x + pos.x,
            y: points[0].y + pos.y,
            w: points[0].x + min,
            h: points[0].y + min
        };
        ctx.strokeStyle = color;
        ctx.strokeRect(bounds.x, bounds.y, bounds.w, bounds.h);
    }
}

class Render extends lib{
    constructor(world){
        super();
        this._world = world.world;
        this.width = world.width;
        this.height = world.height;
        this._ctx = world.worldDraw;
        this._Entity = [];
        this._R = new this.R();
    }
    get Response(){
        return this._R;
    }
    get World(){
        return this._world;
    }
    get ctx(){
        return this._ctx;
    }
    set Colicion(a){
        return this._colicion = a;
    }
    get Colicion(){
        return this._colicion;
    }
    set Entity(a){
        return a.map(e=>{
            let {name} = e;
            this._Entity.push({[name]:e})
        })
    }
    get Entity(){
        return this._Entity;
    }
    set Event(a){
        let {type,callback} = a;
        return this._world.addEventListener(type,(a)=>{
            if(typeof callback === "function"){
                let {offsetX,offsetY,x,y} = a;
                callback(
                    {offsetX,offsetY,x,y},
                    (a)=>(this.Entity.filter(
                    e=>Object.keys(e)[0]===a
                    ))[0][a],
                    (fx)=>{
                        this.Response.clear()
                        this.Colicion.isColicion?fx({Obj:this.Colicion.name,data:this.Response}):""
                    })
            }else{
                throw "require function";
            }
        })
    }
    loop(){
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);
        this.Entity.map((e,i)=>{
            let get = 0;
            if(i==0){
                get = 1;
            }else if(i==(this.Entity.length-1)){
                get = 0;
            }else{
                get = i;
            }
            let Entity = e[Object.keys(e)[0]];
            let EntityNext = this.Entity[get][Object.keys(this.Entity[get])[0]];
            this.Colicion = {name:Entity,isColicion:Entity.colicionWith(EntityNext,this.Response)};
            Entity.draw(ctx);
            Entity.drawBox(ctx);
        })
        setTimeout(()=>this.loop(), 1000 / 60);
    }
}
export default {World,Entity,Render}