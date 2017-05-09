import React from "react"
import {Link} from 'react-router-dom'
import {getURL} from '../util'
export default ({data,book})=>{
    return <div>
        {(()=>{
            if(data.prev){
                return <div className="toolbar">
                    <Link to={getURL(book,data.prev)}>上一章</Link>
                    <Link to={`/menu/${book}?page=1`}>目录</Link>
                    <Link to={getURL(book,data.next)}>下一章</Link>
                </div>
            }else{
                return null
            }
        })()}
        <section className="content" dangerouslySetInnerHTML={{__html: data.content}} >

        </section>
    </div>
}