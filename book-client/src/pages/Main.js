import React from 'react';
import Cover from '../components/CoverBox'
const data = {
    pic:'http://www.xxbiquge.com/cover/74/74821/74821s.jpg'
}
export default ({match,history})=>{
    // console.log(props)
    // const {match,history} = props
    return <div>
        <div className="titlebar">
            <span className="title">{match.params.book}</span>
        </div>
        <Cover book={match.params.book} history = {history}></Cover>
    </div>   
}