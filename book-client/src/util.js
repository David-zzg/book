export function  getQuery(name,default_value){
    var reg = new RegExp(name+"=([^\&]*)")
    var result = location.search.match(reg)
    return result?result[1]:default_value
}

export function  redirect({path=location.href,key,value}){
    var reg = new RegExp(key+"=([^\&]*)")
    var result = path.replace(reg,key+"="+value)
    return result
}

export function getURL(book,url){
    return '/detail/'+book+'?from='+encodeURIComponent(url)
}