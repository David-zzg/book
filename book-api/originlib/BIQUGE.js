const Origin = require('../origin.js')
const {getContent} = require('../request')
const Book = require('../book.js')
const Menu = require('../menu.js')
const Article = require('../article.js')
var request = require('superagent')
const path = require("path")
function getPrefix(url){
    var prefix = url.match(/((http|https):\/\/)?.*(com|cn)/)[0]
    return prefix
}
class BIQUGE_ARTICLE extends Article{
    constructor(url){
        super(url)
    }
    async getContent(){
        var $ = await getContent(this.url)
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
class BIQUGE_MENU extends Menu{
    //根据页数获取目录url
    getURL(page=0){
        var url = this.url
        if(page>1){
            url+=`index_${page}.html`
        }
        return url
    }
    //获取目录的分页信息
    async getMenuSelect(){
        var url = this.getURL()
        var $ = await getContent(url)
        var list = []
        var prefix = this.url.match(/((http|https):\/\/)?.*(com|cn)/)[0]
        $('select[name="pageselect"] option').each((index,item)=>{
            list.push({
                page:index+1,
                str:$(item).text(),
                url:prefix+$(item).val()
            })
        })
        return list
    }

    //根据页数获取内容
    async getMenuByPage(page=0,direction=true){
        var url = this.getURL(page)
        var $ = await getContent(url)
        var list = []
        $(".directoryArea").eq(1).find(">p").each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:this.url+$(item).find("a").attr('href')
            })
        })
        return list
    }
    //获取最新章节
    async getLastMenu(){
        var url = this.getURL()
        var list = []
        var $ = await getContent(url)
        $('#chapterlist').find(">p").each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:this.url+$(item).find("a").attr('href')
            })
        })
        return list
    }
    getArticle(url){
        return new BIQUGE_ARTICLE(url)
    }
}
class BIQUGE_BOOK extends Book{
    constructor(options){
        super(options)
    }
    getArticle(url){
        return new BIQUGE_ARTICLE(url)
    }
    //获取菜单
    getMenu(){
        var url = this.getOrigin()
        return new BIQUGE_MENU({
            url:url.replace(/www/,'wap')
        })
    }

    async getBookInfo(){
        var url = this.getOrigin().replace(/www/,'wap')
        var $ = await getContent(url)
        var info = {
            pic:$('.synopsisArea_detail').find('img').attr('src'),
            author:$('.author').text().slice(3),
            type:$('.synopsisArea_detail .sort').text().slice(3),
            last:$('.synopsisArea_detail p').last().text().slice(3),
            status:$('.synopsisArea_detail p').eq(2).text().slice(3),
            lastChapter:$('.synopsisArea_detail p').eq(3).find("a").text().slice(3),
            lastChapterHref:this.url.replace(/www/,'wap')+$('.synopsisArea_detail p').eq(3).find("a").attr("href"),
            review:$('.review').html()
        }
        return info
    }
}
class BIQUGE extends Origin{
    constructor(options={}){
        var default_options = {
            url:"http://wap.xxbiquge.com"
        }
        super(Object.assign({},default_options,options))
    }
    //查找书籍的页面url
    async getURLByName(name){
        var url = `http://zhannei.baidu.com/cse/search?s=8823758711381329060&q=${encodeURI(name)}&submit=`
        var $ = await getContent(url)
        var bookurl = $('.result-game-item-title-link').attr('href')
        return bookurl
    }

    //查找书籍获取搜索结果
    async getListByName(name,page=0){
        var url = `http://zhannei.baidu.com/cse/search?s=8823758711381329060&q=${encodeURI(name)}&submit=&p=${page}`
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
    async getBook(url){
        var book = new BIQUGE_BOOK({
            url
        })
        return book
    }

    getURL(page=0){
        var url = this.url
        if(page>1){
            url+=`index_${page}.html`
        }
        return url
    }
    async getMenuByPage(page=0){
        var url = this.getURL(page)
        var $ = await getContent(url)
        var list = []
        $(".directoryArea").eq(1).find(">p").each((index,item)=>{
            list.push({
                str:$(item).text(),
                url:this.url+$(item).find("a").attr('href')
            })
        })
        return list
    }

}
module.exports = BIQUGE