import React from 'react';
import Cover from '../components/CoverBox'
import Title from "../elements/Title"
export default ({match,history})=>{
    return <div>
        <Title>
            <span className="title">{match.params.book}</span>
        </Title>
        <Cover book={match.params.book} origin={match.params.origin} history = {history}></Cover>
    </div>   
}