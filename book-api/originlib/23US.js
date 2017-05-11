const CommonOrigin = require('../origin.js')
const {getContent} = require('../request')
const CommonBook = require('../book.js')
const CommonMenu = require('../menu.js')
const CommonArticle = require('../article.js')
var request = require('superagent')
const path = require("path")
const charset = undefined 
function getPrefix(url){
    var prefix = url.match(/((http|https):\/\/)?.*(com|cn)/)[0]
    return prefix
}
class ARTICLE extends CommonArticle{
    constructor(url){
        super(url)
    }
    async getContent(){
        var $ = await getContent(this.url,charset)
        var data = {
            prev:getPrefix(this.url)+$('#pt_prev').attr("href"),
            next:getPrefix(this.url)+$('#pt_next').attr("href"),
            content:this.getStr($)
        }
        return data
    }
    getStr($){
        $('#chaptercontent').find("script").remove()
        $('#chaptercontent').find("p").eq(0).remove()
        $('#chaptercontent').find("p").last().remove()
        return $('#chaptercontent').html()
    }
}
class MENU extends CommonMenu{
    //根据页数获取目录url
    getURL(page=1){
        var url = this.url+'&page='+page
        return url
    }
    //获取目录的分页信息
    getMenuSelect(){
        return []
    }

    //根据页数获取内容
    async getMenuByPage(page=1){
        var url = this.getURL(page)
        var $ = await getContent(url,charset)
        var list = []
        $(".onechapter").each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:this.host+$(item).find("a").attr('href')
            })
        })
        return list
    }
    //获取最新章节
    async getLastMenu(){
        var url = this.host+"wapbook/"+this.id+".html"
        var list = []
        var $ = await getContent(url,charset)
        $('.chapter9 div').each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:this.host+$(item).find("a").attr('href')
            })
        })
        return list
    }
    getArticle(url){
        return new ARTICLE(url)
    }
}
class BOOK extends CommonBook{
    constructor(options){
        super(options)
    }
    getArticle(url){
        return new ARTICLE(url)
    }
    //获取菜单
    getMenu(){
        var url = this.getOrigin()
        return new MENU({
            url:this.host+'modules/article/wapallchapter.php?aid='+this.id,
            host:this.host,
            id:this.id
        })
    }

    async getBookInfo(){
        var url = this.url
        var $ = await getContent(url,charset)
        var info = {
            pic:$('.lb_fm').find('img').attr('src'),
            author:$('.lb_fm').find("td").eq(1).find("div").eq(1).text().slice(4),
            type:$('.lb_fm').find("td").eq(1).find("div").eq(2).text().slice(4),
            last:$('.lb_fm').find("td").eq(1).find("div").eq(3).text().slice(4),
            // status:$('.synopsisArea_detail p').eq(2).text().slice(3),
            lastChapter:$('.lb_fm').find("td").eq(1).find("div").eq(3).text().slice(4),
            lastChapterHref:this.host+$('.lb_fm').find("td").eq(1).find("div").eq(3).find("a").attr("href"),
            review:$('.lb_jj').find("div").last().html()
        }
        return info
    }
}
class Origin  extends CommonOrigin{
    constructor(options={}){
        var default_options = {
            url:"http://m.booktxt.net/"
        }
        super(Object.assign({},default_options,options))
    }
    //查找书籍的页面url
    async getURLByName(name){
        var url = `http://zhannei.baidu.com/cse/search?s=8253726671271885340&q=${encodeURI(name)}&submit=`
        var $ = await getContent(url,charset)
        var bookurl = $('.result-game-item-title-link').attr('href')
        var result = bookurl.replace(/www/,'m')
        return result
    }

    //查找书籍获取搜索结果
    async getListByName(name,page=0){
        var url = `http://zhannei.baidu.com/cse/search?s=8253726671271885340&q=${encodeURI(name)}&submit=&p=${page}`
        var $ = await getContent(url,charset)
        var list = []
        $('.result-item').each(function(){
            list.push({
                name:$(this).find(".result-game-item-title-link").text().replace(/\s|\\r|\\n/g,""),
                url:$(this).find(".result-game-item-title-link").attr("href"),
                pic:$(this).find(".result-game-item-pic-link-img").attr("src"),
                author:$(this).find('[cpos="author"]').text().replace(/\s|\\r|\\n/g,""),
                status:$(this).find(".result-game-item-info-tag-title").last().text()
            })
        })
        return list
    }

    //获取书籍
    async getBook(url){
        var book = new BOOK({
            url,
            id:this.id,
            host:this.url
        })
        return book
    }

    

}
module.exports = Origin