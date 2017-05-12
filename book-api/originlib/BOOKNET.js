const CommonOrigin = require('../origin.js')
const {getContent} = require('../request')
const CommonBook = require('../book.js')
const CommonMenu = require('../menu.js')
const CommonArticle = require('../article.js')
var request = require('superagent')
const path = require("path")
const charset = "gbk" 
const host = `http://m.booktxt.net`
class ARTICLE extends CommonArticle{
    constructor(url){
        super(url)
    }
    async getContent(){
        var $ = await getContent(this.url,charset)
        var data = {
            prev:host+$('#pt_prev').attr("href"),
            next:host+$('#pt_next').attr("href"),
            content:this.getStr($)
        }
        return data
    }
    getStr($){
        return $('#nr1').html()
    }
}
class MENU extends CommonMenu{
    //根据页数获取目录url
    getURL(page=1){
        var url = this.url+'&page='+page
        return url
    }
    //获取目录的分页信息
    async getMenuSelect(){
        return []
    }

    //根据页数获取内容
    async getMenuByPage(page=1){
        var url = this.getURL(page)
        var $ = await getContent(url)
        var list = []
        $(".onechapter").each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:host+$(item).find("a").attr('href')
            })
        })
        return list
    }
    //获取最新章节
    async getLastMenu(){
        var url = host+"/wapbook/"+this.id+".html"
        var list = []
        var $ = await getContent(url,charset)
        $('.chapter9 div').each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:host+$(item).find("a").attr('href')
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
            url:`http://m.booktxt.net/modules/article/wapallchapter.php?aid=${this.id}`,
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
            lastChapterHref:host+$('.lb_fm').find("td").eq(1).find("div").eq(3).find("a").attr("href"),
            review:$('.lb_jj').find("div").last().html()
        }
        return info
    }
}
class Origin  extends CommonOrigin{
    //查找书籍获取搜索结果
    async getListByName(name,page=0){
        var url = `http://zhannei.baidu.com/cse/search?s=5334330359795686106&q=${encodeURI(name)}&submit=&p=${page}`
        var $ = await getContent(url)
        var list = []
        $('.result-item').each(function(){
            list.push({
                name:$(this).find(".result-game-item-title-link").text().replace(/\s|\\r|\\n/g,""),
                url:$(this).find(".result-game-item-title-link").attr("href"),
                pic:$(this).find(".result-game-item-pic-link-img").attr("src"),
                author:$(this).find('.result-game-item-info-tag').first().find("span").last().text().replace(/\s|\\r|\\n/g,"")
            })
        })
        return list
    }

    //获取书籍
    getBook(url){
        var result = url.match(/_(\d+)\//)
        var id = result[1]
        var book = new BOOK({
            url:`http://m.booktxt.net/wapbook/${id}.html`,
            id
        })
        return book
    }

}
module.exports = Origin