import React from "react"
import SearchList from "../components/SearchList"
import Title from "../elements/Title"
export default ({match,history})=>{
return  <div>
    <Title>
        <span></span>
        <span className="title">主页</span>
        <span></span>
    </Title>
    <SearchList history={history} origin={match.params.origin} book={match.params.book} ></SearchList>
</div>}