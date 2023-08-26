import { FetchAllData } from "../API";
import React, { useState, useEffect } from 'react';

const Profile = ({username}) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function getAllData() {
            const APIResponse = await FetchAllData();
            console.log(APIResponse)
            if (APIResponse && APIResponse.success) {
                setPosts(APIResponse.data.posts);
            } else {
                setError(APIResponse.error.message);
            }
        }
        getAllData();
    }, []);
    console.log(posts)
    return (
        <>
            <div>
                <h1>Welcome Back To Your Profile {username}! </h1>
                <h2>Message Inbox</h2>
            </div>

            {posts && posts.map((post) => (
                <div key={post._id} className="messages">
                     {post.messages && post.messages.map((message, index) => ( 
                        <div key={index}>
                        <h2>Messages from: {message.fromUser.username}</h2>
                        <h4>Sent on:{message.createdAt}</h4>
                        <p>Message: {message.content}</p> 
                        
                         
                         </div>
                     ))}
                </div>
            ))}

            {error && <p>{error}</p>}
        </>
    )
}

export default Profile;