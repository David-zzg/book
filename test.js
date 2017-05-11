var path = require("path")
var fs = require("fs")
var book = "大主宰"
var dirList = fs.readdirSync(path.resolve(__dirname,"./book-api/originlib"))
var list = []
var originF = require("./book-api/originlib/BOOKNET.js")
var bookObj = new originF().getListByName("大主宰").then(data=>{
    console.log(data)
})
