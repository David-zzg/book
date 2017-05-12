import React from "react"
import PageBox from "../components/PageBox"
import Title from "../elements/Title"
export default ({match,history})=><div>
    <Title>
        <span onClick={()=>window.history.back()}>后退</span>
        <span className="title">{match.params.book}</span>
        <span></span>
    </Title>
    <PageBox book={match.params.book} origin={match.params.origin}></PageBox>
</div>