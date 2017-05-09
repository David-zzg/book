import React from "react"
import Page from "./Page"
import request from '../request'
import {getQuery} from '../util'
export default class PageBox extends React.Component{
    state={
        data:{}
    }
    render(){
        return <Page book={this.props.book} data={this.state.data}></Page>
    }
    fetchData(){
        request.get(`${window.API}/getChapterContent?book=${this.props.book}&from=${getQuery("from","")}`).then(data=>{
            this.setState({
                data:data.data
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        this.fetchData()
    }
    componentWillMount() {
        this.fetchData()
    }
}