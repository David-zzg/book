import axios from "axios"
class Connect{
    constructor(){
        this.errorNum = 0
    }
}
function get(url,obj){
    return new Promise((resolve)=>{
        axios.get(url).then(data=>{
            var json_data = data.data
            if(json_data.code===200){
                resolve(json_data)
            }else{
                obj.errorNum++
                console.log('错误，重新连接中'+obj.errorNum)
                if(obj.errorNum>3){
                    console.log('错误次数太多')
                }else{
                    return resolve(get(url,obj))
                }
            }
        })
    })
}
var method = {
    get:(url)=>{
        var obj = new Connect()
        return get(url,obj)
        
    }
}
export default method