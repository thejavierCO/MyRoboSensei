import SAT from "sat";

class lib{
    constructor(){
        this._V = SAT.Vector;
        this._P = SAT.Polygon;
        this._R = SAT.Response;
        this._C = {
            PP:SAT.testPolygonPolygon,
            PC:SAT.testPolygonCircle,
            CP:SAT.testCirclePolygon,
            CC:SAT.testCircleCircle
        }
    }
    get R(){
        return this._R;
    }
    set R(a){
        if(typeof a === "boolean"){
            return new this._R();
        }
    }
    get P(){
        return this._P;
    }
    set P(a){
        return this._P;
    }
    get V(){
        return this._V;
    }
    set V(a){
        return this._V;
    }
    set C(a){
        return this._C;
    }
    get C(){
        return this._C;
    }
}

class Entity extends lib{
    constructor(name="",posicion=[0,0]){
        super();
        let {0:x,1:y} = posicion;
        this._posicion = new this.V(x,y);
        this._name = name;
        this._R = new this.R();
    }
    get Response(){
        return this._R;
    }
    get name (){
        return this._name;
    }
    set name (a){
        return this._name = a;
    }
    get posicion(){
        return this._posicion;
    }
    set posicion(a){
        let {0:x,1:y} = a;
        return this._posicion = new this.V(x,y);
    }
}

class ObjEntity extends Entity{
    constructor(name,posicion,body=[[0,0],[0,0]],color=""){
        super(name,posicion);
        this._bgcolor = color;
        this._color = "";
        this._body = new this.P(this.posicion,body.map(({0:x,1:y})=>new this.V(x,y)));
        this.colicionWith = (Obj)=>this.C.PP(this.body,Obj.body,this.Response);
    }
    get perimetro(){
        let {points} = this.body;
        let p = [];
        points.forEach((e,i,c)=>{
            let {x:x1,y:y1} = e;
            let {x:x2,y:y2} = c[(i===0?points.length-1:(i==(points.length-1)?0:i))]
            p.push(Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2))))
        })
        return p;
    }
    get body(){
        return this._body
    }
    set body(a){
        return this._body = new this.P(this.posicion,a.map(({0:x,1:y})=>new this.V(x,y)));
    }
    set color(a){
        return this._color = a;
    }
    get color(){
        return this._color;
    }
    set bgcolor(a){
        return this._bgcolor = a;
    }
    get bgcolor(){
        return this._bgcolor;
    }
    setPosicion(...arg){
        if(arg.length>2){
            throw "require de solo 2 elementos X y Y"
        }else{
            let {0:x,1:y} = arg.filter(e=>typeof e === "number"?e:console.warn("not is number in setPosicion",e));
            return this.body.pos = this.posicion = new this.V(x,y)
        }
    }
    getPosicion(){
        return this.body.pos;
    }
    drawBody(ctx,color=this.bgcolor){
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
    drawBorder(ctx,color=this.color){
        let {points,pos} = this.body;
        var i = points.length;
        ctx.strokeStyle = color;
        ctx.save();
        ctx.translate(pos.x,pos.y);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        while (i--) ctx.lineTo(points[i].x, points[i].y);
        ctx.closePath();
        ctx.stroke();
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

class textEntity extends Entity{
    constructor(name,posicion,text="",color="",propiety="10px"){
        super(name,posicion);
        this._color = color;
        this._text = text;
        this._propiety = propiety;
    }
    set color(a){
        return this._color = a;
    }
    get color(){
        return this._color;
    }
    set propiety(a){
        return this._propiety = a;
    }
    get propiety(){
        return this._propiety;
    }
    get text(){
        return this._text;
    }
    set text(a){
        return this._text = a;
    }
    setPosicion(a=[0,0]){
        return this.posicion = a;
    }
    getPosicion(){
        return this.posicion;
    }
    drawBorder(ctx){
        let {x,y} = this.getPosicion();
        ctx.font = this.propiety;
        ctx.fillText(this.text,x,y);
    }
    drawBody(ctx){
        let {x,y} = this.getPosicion();
        ctx.font = this.propiety;
        ctx.strokeText(this.text,x,y)
    }
}

class createEntity{
    constructor(type,name="Entity"){
        window["Entity_load"] = {[name]:
            (window["Entity_load"]?window["Entity_load"][name]?(window["Entity_load"][name])-1:0:0)
        };
        this._id = window["Entity_load"][name];
        this._name = name+this._id;
        switch(type){
            case "Obj":
                this.control = (posicion=[0,0],body=[[0,0],[0,0],[0,0]],color="",name=this.name)=>new ObjEntity(name,posicion,body,color);
            break;
            case "Text":
                this.control = (posicion=[0,0],text="",color="",propiety="",name=this.name)=>new textEntity(name,posicion,text,color,propiety);
            break;
            default:
                throw "require Obj or Text";
        }
        return this.control;
    }
    set id(a){return this._id = a;}
    get id(){return this._id}
    get name(){return this._name}
    set name(a){return this._name = a+this.id}
    set control(a){return this._control = a;}
    get control(){return this._control;}
}

class World{
    constructor(name="Untitle",canvas=document.createElement("canvas"),width=0,height=0){
        this._name = name;
        this._entity = [];
        this._colicion = {};
        this.canvas = canvas;
        this.width = width !== 0?width:canvas.width;
        this.height = height !== 0?height:canvas.height;
    }
    on(type="",fx){
        if(typeof fx === "function"){   
            switch(type){
                case "Colicion":
                    setInterval(()=>{
                        let {colicion} = this.Colicion;
                        if(colicion){
                            fx(this.Colicion);
                        }
                    });
                break;
                case "Hover":
                    this.on("mousemove",fx);
                break;
                case "ClickInEntity":
                    this.on("click",(a,b,c)=>{
                        console.log(a,b((a,b)=>{
                            
                        }),c)
                    })
                break;
                default:
                    this.canvas.addEventListener(type,(a)=>fx(this.Colicion,(a)=>this.getEntitys(a),this.ctx,a));
            }
        }
    }
    set color(a){
        return this.canvas.style.backgroundColor = a;
    }
    get color(){
        return this.canvas.style.backgroundColor
    }
    get width(){
        return this.canvas.width;
    }
    set width(a=0){
        return this.canvas.width = a;
    }
    get height(){
        return this.canvas.height;
    }
    set height(a=0){
        return this.canvas.height = a;
    }
    set Entity(a){
        this._entity.push(a);
    }
    get Entity(){
        return this._entity;
    }
    get Colicion(){
        return this._colicion;
    }
    set Colicion(a){
        return this._colicion = a;
    }
    getEntitys(fx){
        typeof fx === "function"?
        this.Entity.forEach((Entity,Posicion,Entitys)=>fx(
            Entity,
            Entitys[(Posicion===0?Entitys.length-1:(Posicion==(Entitys.length-1)?0:Posicion))]
        )):
        ""
        return this.Entity;
    }
}

class World2D extends World{
    constructor(name,canvas,width,height){
        super(name,canvas,width,height);
        this.ctx = canvas.getContext("2d");
    }
    render(a){
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width,this.height);
        this.getEntitys((Entity,EntityNext)=>{
            this.Colicion = {
                FatherEntity:{
                    [Entity.name]:Entity
                },
                ColicionWith:{
                    [EntityNext.name]:EntityNext
                },
                response:EntityNext.Response,
                colicion:Entity.colicionWith(EntityNext)
            };
            if(typeof a === "function"){
                let f = a(["solid","border","box"]);
                switch(f){
                    case "solid":
                        Entity.drawBody(ctx);
                    break;
                    case "border":
                        Entity.drawBorder(ctx);
                    break;
                    case "box":
                        Entity.drawBox(ctx);
                    break;
                }
            }else{
                Entity.drawBody(ctx);
            }
        })
    }
    renderLoop(a){
        this.render(a);
        setTimeout(()=>this.renderLoop(a), 1000 / 60);
    }
}

class createWorld{
    constructor(type,name="World"){
        window["World_load"] = {[name]:
            (window["World_load"]?window["World_load"][name]?(window["World_load"][name])-1:0:0)
        };
        this._id = window["World_load"][name];
        this._name = name+this._id;
        switch(type){
            case "2D":
                this.control = (canvas,width,height,name)=>new World2D(name||name!==""?name:this.name,canvas,width,height);
            break;
            // case "3D":
            //     this.control = (posicion=[0,0],text="",color="",propiety="")=>new textEntity(this.name,posicion,text,color,propiety);
            // break;
            default:
                throw "require Obj or Text";
        }
        return this.control;
    }
    set id(a){return this._id = a;}
    get id(){return this._id}
    get name(){return this._name}
    set name(a){return this._name = a+this.id}
    set control(a){return this._control = a;}
    get control(){return this._control;}
}

export default {createEntity,createWorld}