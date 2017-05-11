const {mirror} =require('./util')
class Origin {
    constructor(options={}){
        mirror(this,options)
    }
    getSearchURL(){
        throw("缺少getSearchURL方法")
    }
}
module.exports = Origin