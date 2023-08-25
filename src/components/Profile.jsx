import { FetchAllData } from "../API";
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        async function getAllData() {
            const APIResponse = await FetchAllData();
            if (APIResponse && APIResponse.success) {
                setPosts(APIResponse.data.posts);
            } else {
                setError(APIResponse.error.message);
            }
        }
        getAllData();
    }, []);
    
    return (
        <>
            <div>
                <h1>Profile</h1>
                <h3>Message Inbox</h3>
            </div>

            {posts && posts.map((post) => (
                <div key={post._id}>
                    <h4>Messages from: {post.username}</h4>
                    {post.messages && post.messages.map((message, index) => (
                        <p key={index}>{message}</p>
                    ))}
                </div>
            ))}

            {error && <p>{error}</p>}
        </>
    )
}

export default Profile;