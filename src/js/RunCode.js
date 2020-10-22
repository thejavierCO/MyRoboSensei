export default class{
    constructor(editor={},tools={}){
        this.values = editor;
        this.tools = tools;
    }
    Run(a=this.values){
        try{
            let num = 0,testingTime = setInterval(()=>{num = num+1;});
            let {getValue} = a;
            if(getValue){
                this.setResult(a.getValue(),this.tools)
                .then(e=>{
                    console.warn("Run Code",e.length);
                    return eval(e)
                }).then(e=>{
                    clearInterval(testingTime);
                    console.warn("OK time:"+num);
                    typeof e !== "undefined"?
                    console.log("response",e)
                    :"undefined";})
                .catch(e=>{
                    clearInterval(testingTime);
                    console.warn("Error time:"+num);
                    throw e
                })
            }else{throw "require getValue in editor monaco";}
        }catch(a){console.error(a)}
    }
    toString(b=[]){
        return typeof b === "object"&&b.length===0?
        ((a)=>{
            let result = "",keys = Object.keys(a);
            keys.map((e,i)=>{
                if(i==0){result += "{";}
                result += (i==(keys.length-1)?keys.length>1?",":"":"")+e+":"+(
                    this.toString(a[e])
                )+(i==0||keys.length>1?keys.length>1?",":"":"");
                if(i==(keys.length-1)){result += "}";}
            })
            return result;
        })(b):((a)=>a.toString())(b);
    }
    async setResult(a="",b=[]){
        return typeof a == "string"?
        [
            this.toString(b),
            "(async ()=>{",
            a,
            "})()",
            ".then(a=>a)",
            ".catch(a=>{throw a})"
        ].join("\n")
        :""
    }
};