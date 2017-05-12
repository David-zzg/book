import React from "react"
import Search from "../elements/Search"
import request from '../request'
import Cover from "./Cover"
import {Link} from 'react-router-dom'
var origin = null
var searchObj = null

export default class SearchList extends React.Component{
    state={
        list:[]
    }
    fetchData(){
        var param=this.getParam()
        request.get(`${window.API}/searchBook?book=${param.search}&origin=${param.origin}`).then(data=>{
            console.log('touch')
            if(data.code===200){
                this.setState({
                    list:data.data
                })
            }
        })
    }
    getParam(){
        var origin=document.getElementById("origin")
        var search=document.querySelector(".search")
        return {
            origin:origin.value,
            search:search.value
        }

    }
    componentDidMount(){
        if(this.props.book){
            this.fetchData()
        }
    }
    componentWillReceiveProps(nextProps) {
        this.fetchData()
    }
    callback(){
        var param=this.getParam()
        this.props.history.push("/search/"+param.origin+"/"+param.search)
    }
    render(){
        
        return <div>
            <div className="search-bar">
                <Search  book={this.props.book} callback={this.callback.bind(this)}></Search>
                <select id="origin" value={this.props.origin} onChange={this.callback.bind(this)}>
                    <option value="BIQUGE">笔趣阁</option>
                    <option value="BOOKNET">顶点小说</option>
                </select>
            </div>
            
            <ul>
                {this.state.list.map((item,index)=>{
                    return <li key={item.url}>
                        <Link to={`/menu/${this.getParam().origin}/${item.name}?url=${encodeURIComponent(item.url)}&page=1`}>
                            <Cover book={item.name} data={item}></Cover>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    }
}
