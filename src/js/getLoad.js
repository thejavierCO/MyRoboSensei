
export let StringToArray = (a)=>{
    let result = [];
    if(typeof a === "string"){
        for (let i = 0; i < a.length; i++) {
            const letter = a[i];
            result.push(letter);
        }
    }
    return result;
}

export let ArrayToString = (a)=>{
    let result = "";
    if(typeof a === "object"&&a.length>0){
        a.forEach(e => {
            result += e;
        });
    }
    return result;
}

export default (posicion=document.body,query="",time_await=3000)=>new Promise((res,rej)=>{
    let t = 0;
    let time = setInterval(() => {
        let tag = document.querySelector(query);
        if(tag!==null){
            res({tag,query,t});
            clearInterval(time);
        }else if(t>=time_await){
            rej({error:"not exist element"});
            clearInterval(time);
        }
        t=t+1;
    });
    let id,className;
    if(/(#)/g.test(query)){
        id = (StringToArray(query).filter(e=>!/(#)/g.test(e))).join("");
    }else if(/(.)/g.test(id||query)){
        className = StringToArray(id||query).filter(e=>!/(#)/g.test(e)).join("");
    }
    let setTag = document.createElement("div");
    id?setTag.id = id:"";
    className?setTag.className = className:"";
    posicion.appendChild(setTag);
})