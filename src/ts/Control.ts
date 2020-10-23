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
    name:string;
    constructor(NameRobot:string) {
        this.name = NameRobot||"mike";
    }
    msg(...arg:[string]):any {
        arg.map(e=> {
            console.log(e);
        });
    }
    delay = async (ms:number)=> {
        this.msg("Espera "+this.name);
        return new Promise(
            r=> setTimeout(()=> {
                this.msg("continua");
                r();
            },ms)
        );
    }
}