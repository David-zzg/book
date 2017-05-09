import React from "react"
import Cover from './Cover'
import ListView from '../elements/ListView'
import axios from 'axios'
import request from '../request'
import {getQuery,redirect,getURL} from '../util'
import {Link,Redirect} from 'react-router-dom'

const ListViewOptions = (book)=>({
    value:"str",
    href : function(item){
        return getURL(book,item.url)
    }
})
export default class CoverBox extends React.Component{
    state={
        data:{},
        menu:[],
        pre:"",
        next:"",
        select:[],
        last:""
    }
    redirect(offset){
        var page = getQuery("page",1)
        var newpage = parseInt(page)+parseInt(offset)
        if(newpage>=1){
            return redirect({path:location.pathname+location.search,key:"page",value:newpage})
        }else{
            return ""
        }
    }
    render(){
        return <div>
            <Cover book={this.props.book} data={this.state.data}></Cover>
            {/*简介*/}
            <section className="review" dangerouslySetInnerHTML={{__html: this.state.data.review}}></section>
            {/*目录*/}
            <ListView className="menu"  list={this.state.menu} options={ListViewOptions(this.props.book)}></ListView>
            <div className="menu_footer">
                <Link className={this.state.pre?"btn":"disabel btn"} onClick={(e)=>{if(!this.state.pre){e.preventDefault()}}}  to={this.state.pre}>上一页</Link>
                <select value={getQuery("page",1)} onChange={this.select.bind(this)}>
                    {this.state.select.map(item=><option key={item.page} value={item.page}>{item.str}</option>)}
                </select>
                <Link className="btn" to={this.state.next}>下一页</Link>
            </div>
            
        </div>
    }
    select(e){
        this.props.history.push(redirect({path:location.pathname+location.search,key:"page",value:e.target.value}))
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData(false)
    }
    fetchData(first=true){
        var db = {}
        var list = []
        list.push(request.get(`${window. API}/getBookMenu?book=${this.props.book}&page=${getQuery("page",1)}`))
        if(first){
            //获取书籍信息
            list.push(request.get(`${window. API}/getBookInfo?book=${this.props.book}`))
            //获取分页信息
            list.push(request.get(`${window. API}/getBookPage?book=${this.props.book}`))
        }
        Promise.all(list).then((data)=>{
            var state = {
                menu:data[0].data,
                pre:this.redirect(-1),
                next:this.redirect(1)
            }
            if(first){
                state.data = data[1].data
                state.select = data[2].data
            }
            this.setState(state)
        })
    }
    componentWillMount() {
        this.fetchData()
    }

}