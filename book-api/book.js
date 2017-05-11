const {request} = require('./request')
const {mirror} =require('./util')
const Menu = require('./menu')
var cheerio = require('cheerio');

class Book{
    constructor(options){
        mirror(this,Object.assign({
            charset:"utf-8"
        },options))
    }
    //获取菜单
    getMenu(){
        var url = this.getOrigin()
        return new Menu({
            url
        })
    }

    getLastMenu(){
        return []
    }
    getLastArticle(){
        return ""
    }

    //获取上一个
    getPre(){

    }
    //获取下一个
    getNext(){

    }
    //获取指定文章
    getArticleByURL(){

    }
    
    //获取文章来源
    getOrigin(){
        return this.url
    }
    //根据索引切换来源
    changeOrigin(index){

    }
    //是否已经更新
    isUpdate(){

    }
}


module.exports = Book
