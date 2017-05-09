import React from "react"
import {Link} from 'react-router-dom'
import PageBox from "../components/PageBox"
export default ({match,history})=><div>
    <div className="titlebar">
        <span onClick={()=>window.history.back()}>后退</span>
        <span className="title">{match.params.book}</span>
        <span></span>
    </div>
    <PageBox book={match.params.book}></PageBox>
</div>