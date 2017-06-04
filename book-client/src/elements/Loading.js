import React from "react"
export default function loading({loading,children}){
    if(loading){
        return <div>正在加载中...</div>
    }else{
        return <div>{children}</div>
    }
}


