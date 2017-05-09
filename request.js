var request = require('superagent')
const charset = require('superagent-charset');
var cheerio = require('cheerio');
charset(request)
var getContent = async function(url,charset="utf-8"){
    var result = await request.get(url)
        .set('user-agent',"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
    var $ = cheerio.load(result.text);
    return $
}
module.exports.request = request
module.exports.getContent = getContent