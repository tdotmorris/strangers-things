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
       
        {post && postToDisplay.map((post)=>{
            return <h3 key={post._id}>{post.messages}{post.username}</h3>
                
        })}
        <div>
            <h1>Profile</h1>
            <h3>Message Inbox</h3>
        </div>
        </>
    )
}
export default Profile