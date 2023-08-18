import { FetchAllData } from "../API"
import React, {useState, useEffect } from 'react';

const Profile = () => {
    const[post, setPost]=useState('')
    const[error, setError]=useState(null)
    
    useEffect(()=>{
        async function getAllData() {
            const APIResponse= await FetchAllData();
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
        <h2>Welcome</h2>
        <h3>Message Inbox</h3>
        {post && postToDisplay.map((post)=>{
            return <h3 key={post._id}>{post.messages}{post.username}</h3>
                
        })}
        <div>
            <h1>Stranger's Things</h1>
        </div>
        </>
    )
}
export default Profile