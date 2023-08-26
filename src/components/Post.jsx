import React from "react";
import Posts from "./Posts";


export default function Post({post, post:{title,description,price,willDeliver} ,captureEdit,changeEditState}) {
    
    return (
        <>
         <div key={post._id}> 
            <p>{title}</p>
            <p>{description}</p>
            <p>{price}</p>
            <p>{willDeliver}</p>
    
                <button onClick={()=>{
                    changeEditState(post);
                    captureEdit(post);
                    }} >
                    
                  Edit
                </button >
            
        </div>
        </>
    )
}