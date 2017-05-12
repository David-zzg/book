var path = require("path")
var fs = require("fs")
var book = "大主宰"
var dirList = fs.readdirSync(path.resolve(__dirname,"./book-api/originlib"))
var list = []
var originF = require("./book-api/originlib/BOOKNET.js")
var bookObj = new originF()
bookObj.getListByName("大主宰").then(data=>{
    var book = bookObj.getBookByURL(data[0].url)
    book.getBookInfo().then(data=>{
        console.log(data)
    })
    // book.getMenu().getMenuByPage(1).then(data=>{
    //     console.log(data)
    // })
    // book.getMenu().getLastMenu().then(data=>{
    //     var article = book.getArticle(data[0].url)
    //     article.getContent().then(data=>{
    //         console.log(data)
    //     })
        
    // })
    
})
