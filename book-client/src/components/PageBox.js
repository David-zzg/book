import React from "react"
import Page from "./Page"
import request from '../request'
import {getQuery} from '../util'
export default class PageBox extends React.Component{
    state={
        data:{}
    }
    render(){
        return <Page origin={this.props.origin} book={this.props.book} data={this.state.data}></Page>
    }
    fetchData(){
        request.get(`${window.API}/getChapterContent?book=${getQuery("url","")}&from=${getQuery("from","")}&origin=${this.props.origin}`).then(data=>{
            this.setState({
                data:data.data
            })
            document.title = window.TITLE+"-"+this.props.book+"-"+data.data.title
        })
    }
    componentWillReceiveProps(nextProps) {
        this.fetchData()
    }
    componentWillMount() {
        this.fetchData()
    }
}