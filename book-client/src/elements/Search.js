import React from "react"
export default ({className,callback,book})=><form style={{flexGrow:1}}  className={className} onSubmit={(e)=>{
    callback&&callback()
    e.preventDefault()
    }}>
    <input type="search" className="search" defaultValue={book}  />
</form>