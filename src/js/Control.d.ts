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
    delay: (ms: number) => Promise<unknown>;
}
