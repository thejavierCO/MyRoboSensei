declare type sensor = {
    name: string;
    f: object;
};
declare class Sensor {
    get: (a: any) => {};
    getSensor(type: string): sensor;
}
declare class Control {
    name: string;
    constructor(NameRobot: string);
    msg(...arg: [string]): any;
    delay: (ms: number) => Promise<unknown>;
}
