const fs = require('fs')
const path = require('path')
const bookobj = require('./book')
const Book = bookobj.Book
const createBook = bookobj.createBook
const isBookExist = bookobj.isBookExist
const request = require("superagent")
const commonEvent = require("./event")
function book(app){
    //设置跨域访问  
    app.all('*', function(req, res, next) {  
        res.header("Access-Control-Allow-Origin", "*");  
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
        next();  
    });  

    function  errorHanlde(err,res) {
        sendError(res,err.code)
    }

    

    async function getContent(chapter=1,res){
        const origin = require('./originlib/BIQUGE')
        var biquge = new origin()
        var book = await biquge.getBook("大主宰")
        var menu = book.getMenu()
        var list = await menu.getMenuByPage(chapter)
        var url = list[0].url
        var article = await menu.getArticle(url)
        var content = await article.getContent()
        res.send(content)
    }

    var bookList = {}

    async function getBook(url,from="BIQUGE"){
        if(bookList[url])return bookList[url]
        const origin = require('./originlib/'+from)
        var originObj = new origin()
        var book = await originObj.getBook(url)
        bookList[url] = book
        return book
    }

    async  function getCover(book){
        return await book.then(obj=>obj.getBookInfo())
    }

    async  function getMenuPage(book){
        return await book.then(obj=>obj.getBookInfo())
    }

    var sendError = (res,error)=>res.json({
        code:0,
        error:error
    })
    var sendSuccess = (res,data)=>res.json({
        code:200,
        data
    })

    var getBookName = (req,res)=>{
        var bookName = req.query.book
        if(!bookName){
            sendError(res,"缺少书籍")
            return ""
        }else{
            return bookName
        }
    }
    var getOrigin = (req,res)=>{
        var origin = req.query.origin
        if(!origin){
            sendError(res,"缺少来源")
            return ""
        }else{
            return origin
        }
    }
    var getChapter = (req,res)=>{
        var chapter = req.query.from
        if(!chapter){
            sendError(res,"缺少来源")
            return ""
        }else{
            return chapter
        }
    }

    //获取指定书目的封面信息
    app.get("/getBookInfo",(req,res)=>{
        var bookName = getBookName(req,res)
        if(!bookName)return
        var origin = getOrigin(req,res)
        if(!origin)return
        var book = getBook(bookName,origin)
        getCover(book).then(data=>{
            sendSuccess(res,data)
        }).catch((err)=>errorHanlde(err,res))
    })

    //获取指定书目的分页信息
    app.get("/getBookPage",(req,res)=>{
        var bookName = getBookName(req,res)
        if(!bookName)return
        var origin = getOrigin(req,res)
        if(!origin)return
        var book = getBook(bookName,origin)
        book.then(item=>{
            var menu = item.getMenu()
            menu.getMenuSelect().then(data=>{
                sendSuccess(res,data)
            })
        }).catch((err)=>errorHanlde(err,res))
    })
    //获取指定书目的菜单
    app.get("/getBookMenu",(req,res)=>{
        var bookName = getBookName(req,res)
        if(!bookName)return
        var origin = getOrigin(req,res)
        if(!origin)return
        var page = parseInt(req.query.page)||1
        var book = getBook(bookName,origin)
        book.then(item=>{
            var menu = item.getMenu()
            menu.getMenuByPage(page).then(data=>{
                sendSuccess(res,data)
            })
        }).catch((err)=>errorHanlde(err,res))
    })


    //获取指定章节的内容
    app.get("/getChapterContent",(req,res)=>{
        var chapter = getChapter(req,res)
        if(!chapter)return
        var bookName = getBookName(req,res)
        if(!bookName)return
        var origin = getOrigin(req,res)
        if(!origin)return
        var book = getBook(bookName,origin)
        book.then(item=>{
            var article = item.getArticle(chapter)
            article.getContent().then(data=>{
                sendSuccess(res,data)
            })
        }).catch((err)=>errorHanlde(err,res))
    })


    app.get('/getMenu',(req,res)=>{
        var book = createBook(req,res)
        if(!book)return
        book.getMenu(req).then(data=>{
            res.send(data)
        }).catch((err)=>errorHanlde(err,res))
    })

    //搜索书籍
    app.get('/searchBook',(req,res)=>{
        var book = getBookName(req,res)
        if(!book)return
        var origin = getOrigin(req,res)
        if(!origin)return
        var originF = require("./originlib/"+origin)
        var bookObj = new originF().getListByName(book).then(data=>{
            sendSuccess(res,data)
        }).catch((err)=>errorHanlde(err,res))
    })

    app.get('/getLastMenu',(req,res)=>{
        var book = createBook(req,res)
        if(!book)return
        book.getLastMenu().then(data=>{
            res.json(data)
        }).catch((err)=>errorHanlde(err,res))
    })


    app.get('/getLastArticle',(req,res)=>{
        var book = createBook(req,res)
        if(!book)return
        var url = req.query.url||""
        if(!url){
            res.send('缺少url')
            return
        }
        var artile = book.getArticle(url)
        artile.getContent().then(data=>res.send(data)).catch((err)=>errorHanlde(err,res))
    })

    app.get('/getArticleByURL',(req,res)=>{
        var book = createBook(req,res)
        if(!book)return
        book.getLastMenu().then(data=>{
            var lastitem = data[0]
            var artile = book.getArticle(lastitem.url)
            artile.getContent().then(data=>res.send(data))
        }).catch((err)=>errorHanlde(err,res))
    })

    async function testf(res,url){
        try{
            const origin = require('./originlib/BIQUGE')
            var biquge = new origin()
            var book = await biquge.getBook("大主宰")
            res.send(JSON.stringify(book))
        }catch(e){
            res.send(JSON.stringify(e))
        }
        
        // var data =  await request.get(url)
        // res.send(data)
    }
    app.get('/test',(req,res)=>{
        var url = req.query.url
        if(!url){
            sendError(res,"没有url")
        }else{
            testf(res,url)
        }
    })
}
module.exports = book
