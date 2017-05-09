import React from "react"
import {Link} from 'react-router-dom'
export default ({list,options,className})=>{
    return <ul className={className}>
        {list.map((item,index)=>(
            <li key={options.key?item[options.key]:index}>
                {options.href?<Link to={options.href(item)}>{item[options.value]}</Link>:item[options.value]}
            </li>
        ))}
    </ul>
}