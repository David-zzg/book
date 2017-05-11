import React from 'react';
import Label from'../elements/Label'
import {getURL} from '../util'
import './Cover.css'
export default ({data,book})=>{
    return <div className="cover">
        <img className="cover_pic" src={data.pic} alt="" onError={()=>{data.pic='http://zhannei.baidu.com/static/img/novel-noimg.jpg'}}/>
        <section className="cover_info">
            <Label labelName="" str={data.name}></Label>
            <Label labelName="作者：" str={data.author}></Label>
            <Label labelName="类型：" str={data.type}></Label>
            <Label labelName="状态：" str={data.status}></Label>
            <Label className="wrap" labelName="最新章节：" str_href={getURL(book,data.lastChapterHref)} str={data.lastChapter}>
            </Label>
        </section>
    </div>
}