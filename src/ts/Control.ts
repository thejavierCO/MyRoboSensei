type sensor = {
    name:string,
    f:object
};

class Sensor {
    // constructor(type:string) {
    // }
    get = (a)=> {
        return {};
    }
    getSensor(type:string):sensor {
        return {
            name:type,
            f:this.get(type)
        };
    }
}
class Control {
    name:string = "";
    constructor(NameRobot:string) {
        this.name = NameRobot;
    }
    delay = async (ms:number)=>new Promise(
        r=> setTimeout(r,ms)
    )
}