import React from "react"

const searchObj = null
const search = (callback)=>{
    if(!searchObj){
        searchObj = document.querySelector(".search")
    }
    callback&&callback(searchObj.value)
    return false;
}
export default class Search extends React.Component{
    componentDidMount(){
        search(this.props.callback)
    }
    render(){
        const {className,callback,book}  = this.props
        return <form className={className} onSubmit={(e)=>{
            search(callback)
            e.preventDefault()
            }}>
            <input type="search" className="search" value={book} />
        </form>
    }
}
/*export default ({className,callback,search})=><form className={className} onSubmit={(e)=>{
    search(callback)
    e.preventDefault()
    }}>
    <input type="search" className="search" value={search} />
</form>*/