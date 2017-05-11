import React from 'react';
export default ({labelName,str,str_href,className})=>{
    if(str){
        return <section className={className}>
            <span>{labelName}</span>
            {
                str_href?<a  href={str_href}>{str}</a>:<span>{str}</span>
            }
        </section>
    }else{
        return null
    }
}