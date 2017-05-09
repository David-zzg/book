const {mirror} =require('./util')
const {createCommonBook} = require('./book2')
class Origin {
    constructor(options={}){
        mirror(this,options)
    }
    getSearchURL(){
        throw("缺少getSearchURL方法")
    }

    // async getBook(options={}){
    //     if(this.book)return this.book
    //     var menuURLList = await this.getURLByName()
    //     var book = await createCommonBook(this.commonName,{
    //         menuURLList:menuURLList
    //     },options)
    //     return book
    // }
}
module.exports = {Origin}