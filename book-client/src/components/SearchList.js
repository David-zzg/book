import React from "react"
import Search from "../elements/Search"
import request from '../request'
import Cover from "./Cover"
import {Link} from 'react-router-dom'
const errorNum = 0
const origin = null

export default class SearchList extends React.Component{
    state={
        list:[]
    }
    callback = (keyword)=>{
        if(!origin){
            origin = document.getElementById("origin")
        }
        request.get(`${window.API}/searchBook?book=${keyword}&origin=${origin.value}`).then(data=>{
            if(data.code==200){
                errorNum = 0
                this.setState({
                    list:data.data
                })
                console.log(data.data)
            }else{
                errorNum++
                console.log('错误，重新连接中'+errorNum)
                if(errorNum>3){
                    console.log('错误次数太多')
                    errorNum = 0
                }else{
                    this.callback(keyword)
                }
                
            }
        })
    }
    render(){
        
        return <div>
            <Search book={this.props.book} callback={this.callback.bind(this)}></Search>
            <select id="origin">
                <option value="BIQUGE">笔趣阁</option>
                <option value="BOOKNET">顶点小说</option>
            </select>
            <ul>
                {this.state.list.map((item,index)=>{
                    return <li key={index}>
                        <Link to={`/menu/${item.name}`}>
                            <Cover book={item.name} data={item}></Cover>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    }
}
