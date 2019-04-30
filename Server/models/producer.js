class Producer{
    constructor(name, rut, location, telephone, manager, ){
        this._name = name;
        this._rut = rut;
        this._location = location;
        this._telephone = telephone;
        this._manager = manager;
    }

    get name(){
        return this._name;
    }

    get rut(){
        return this._rut;
    }

    get location(){
        return this._location;
    }

    get telephone(){
        return this._telephone;
    }

    get manager(){
        return this.manager;
    }

}

let producers = [
    new Producer('producer1','11111111-1','1234,1313','12345678','manager'),
    new Producer('producer2','11111111-1','1234,1313','12345678','manager'),
    new Producer('producer3','11111111-1','1234,1313','12345678','manager'),
    new Producer('producer4','11111111-1','1234,1313','12345678','manager'),
    new Producer('producer5','11111111-1','1234,1313','12345678','manager'),
    new Producer('producer6','11111111-1','1234,1313','12345678','manager')
]

module.exports = {
    Producer
}