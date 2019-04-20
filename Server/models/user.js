class User {
    constructor (name, password){
        this._name = name;
        this._password = password;
    }

    get name(){
        return this._name;
    }

    get password(){
        return this._password;
    }

    verifyPassword(password){
        return password = this.password;
    }
}


let Users = [
    new User('Gabriel', 'contra')
]

function findOne(username, callback){
    let user;
    console.log("findOne: %j ", username)
    for (let element of Users){
        if(element.name == username.username){
            user = element;
            break;
        }
    }
    console.log("user: %j", user)
    if (user){
        callback(null, user);
        return;
    }
    callback({message: 'Usuario no encontrado.'});
}

module.exports = {
    User,
    findOne
}