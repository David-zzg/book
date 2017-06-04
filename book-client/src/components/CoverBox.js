import React from "react"
import Cover from './Cover'
import ListView from '../elements/ListView'
import request from '../request'
import Loading from "../elements/Loading"
import {getQuery,redirect} from '../util'
import {Link} from 'react-router-dom'

const ListViewOptions = (book,origin)=>({
    value:"str",
    href : function(item){
        return `/detail/${origin}/${book}?from=${encodeURIComponent(item.url)}&url=${getQuery("url")}`
    }
})

const getURL = ()=>{
    return decodeURIComponent(getQuery("url"))
}
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
        var newpage = parseInt(page,10)+parseInt(offset,10)
        if(newpage>=1){
            return redirect({path:location.pathname+location.search,key:"page",value:newpage})
        }else{
            return ""
        }
    }
    render(){
        return <div>
            <Loading loading={this.state.menu.length==0}>
                <Cover origin={this.props.origin} book={this.props.book} data={this.state.data}></Cover>
                {/*简介*/}
                <section className="review" dangerouslySetInnerHTML={{__html: this.state.data.review}}></section>
                {/*目录*/}
                <ListView className="menu"  list={this.state.menu} options={ListViewOptions(this.props.book,this.props.origin)}></ListView>
                <div className="menu_footer">
                    <Link className={this.state.pre?"btn":"disabel btn"} onClick={(e)=>{if(!this.state.pre){e.preventDefault()}}}  to={this.state.pre}>上一页</Link>
                    <select value={getQuery("page",1)} onChange={this.select.bind(this)}>
                        {this.state.select.map(item=><option key={item.page} value={item.page}>{item.str}</option>)}
                    </select>
                    <Link className="btn" to={this.state.next}>下一页</Link>
                </div>
            </Loading>
        </div>
    }
    select(e){
        this.props.history.push(redirect({path:location.pathname+location.search,key:"page",value:e.target.value}))
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData(false)
    }
    fetchData(first=true){
        var url= getURL()
        var list= []
        list.push(request.get(`${window. API}/getBookMenu?book=${url}&origin=${this.props.origin}&page=${getQuery("page",1)}`))
        if(first){
            //获取书籍信息
            list.push(request.get(`${window. API}/getBookInfo?book=${url}&origin=${this.props.origin}`))
            //获取分页信息
            list.push(request.get(`${window. API}/getBookPage?book=${url}&origin=${this.props.origin}`))
        }
        Promise.all(list).then((data)=>{
            var state= {
                menu:data[0].data,
                pre:this.redirect(-1),
                next:this.redirect(1)
            }
            if(first){
                state.data= data[1].data
                state.select= data[2].data
            }
            this.setState(state)
            this.changeTitle()
        })
    }
    changeTitle(){
        document.title = window.TITLE+"-"+this.props.book
    }
    componentWillMount() {
        this.fetchData()
    }

}