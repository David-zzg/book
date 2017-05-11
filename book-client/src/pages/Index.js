import React from "react"
import SearchList from "../components/SearchList"
import Title from "../elements/Title"
export default ({match})=>{
    console.log(match)
return  <div>
    <Title>
        <span></span>
        <span className="title">主页</span>
        <span></span>
    </Title>
    <SearchList book={match.params.book} ></SearchList>
</div>}