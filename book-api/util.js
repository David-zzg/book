function mirror(target,obj){
    for(var i in obj){
        target[i]=obj[i]
    }
}
module.exports.mirror = mirror