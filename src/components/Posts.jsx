import { FetchAllData } from "../API"
import React, {useState, useEffect } from 'react';

const Posts = () => {
    const[post, setPost]=useState([])
    const[error, setError]=useState(null)

    
    useEffect(()=>{
        async function getAllData() {
            const APIResponse= await FetchAllData('https://strangers-things.herokuapp.com/api/2305-FTB-ET-WEB-PT/posts')
            if(APIResponse.success){
                setPost(APIResponse.data.posts);
            }else{
                setError(APIResponse.error.message)
            }
            }
            getAllData();
        },[]);   

    const postToDisplay=post

    return (
        <>
       
        <h2>Post</h2>
        
        {post && postToDisplay.map((post)=>{
            
            return <div key={post._id}>
                <h3>{post.title}</h3>
                <h4>{post.username}</h4>
                <h4>{post.description}</h4>
                <h4>{post.price}</h4>
                <h4>{post.location}</h4>
                <h4>{post.willDeliver}</h4>
                </div>
        })}
        
        </>
    )
}
export default Posts;