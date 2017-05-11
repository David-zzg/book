import axios from "axios"
var method = {
    get:(url)=>{
        return axios.get(url).then(data=>{
            return data.data
        })
    }
}
export default method