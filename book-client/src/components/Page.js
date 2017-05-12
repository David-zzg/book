import React from "react"
import {Link} from 'react-router-dom'
import {getQuery} from '../util'
const getURL =(origin,book,url)=>{
    return  `/detail/${origin}/${book}?from=${encodeURIComponent(url)}&url=${getQuery("url")}`
}
export default ({data,book,origin})=>{
    return <div>
        {(()=>{
            if(data.prev){
                return <div className="toolbar">
                    <Link to={getURL(origin,book,data.prev)}>上一章</Link>
                    <Link to={`/menu/${origin}/${book}?url=${getQuery("url")}&page=1`}>目录</Link>
                    <Link to={getURL(origin,book,data.next)}>下一章</Link>
                </div>
            }else{
                return null
            }
        })()}
        <section className="content" dangerouslySetInnerHTML={{__html: data.content}} >

        </section>
    </div>
}