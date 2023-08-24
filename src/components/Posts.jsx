import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FetchAllData } from "../API";
import React, { useState, useEffect } from 'react';
import EditPost from "./EditPost";
import Post from "./Post";

const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;



const Posts = ({token,onUpdatePost}) => {
    const tokenString = localStorage.getItem('authToken'); 
    //const {POST_ID}=useParams();


    const [post, setPost] = useState([]);
    //const[updatePost,setUpdatePost]=useState([]);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [price, setPrice] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    //const navigate=useNavigate()
//state for conditional render of edit form
    const[isEditing,setIsEditing]=useState(false);
    const[editForm,setEditForm]=useState({
        title: '',
        description:'',
        price:'',
        willDeliver:'',
    })

    useEffect(() => {
        async function getAllData() {
            const APIResponse = await FetchAllData(`${BaseURL}/posts`);
            if (APIResponse.success) {
                setPost(APIResponse.data.posts);
            } else {
                setError(APIResponse.error.message);
            }
        }
        getAllData();
    }, []);

    const makePost = async () => {
        try {
            const response = await fetch(`${BaseURL}/posts`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenString}`
                },
                body: JSON.stringify({
                    post: {
                        title: title,
                        description: description,
                        price: price,
                        willDeliver: willDeliver
                    }
                })
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error(error);
            return { success: false, error: error.message };
        }
    };
//when PATCH request happens;auto-hides the form, pushes changes to display
    function handlePostUpdate(updatedPost){
        setIsEditing(false);
        onUpdatePost(updatedPost);
    }
//capture user input in edit form inputs
    function handleChange(e){
        setEditForm({
            ...editForm,
            [e.target.post]: e.target.value
        })
    }
//needed logic for conditional rendering of form
    const changeEditState=(post)=>{
        if(post._id===editForm.id){
            setIsEditing(isEditing=>!isEditing)//hides the form
        }else if(isEditing===false){
            setIsEditing(isEditing=>!isEditing)//shows the form
        }
        }

    const captureEdit=(clickedPost)=>{
        const filtered=post
        post.filter(p=>p._id===clickedPost)
        setEditForm(filtered[0])
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tokenString) {
            setError("You must be logged in to make a post.");
            return;
        }

        const result = await makePost();
        if (result && result.success) {
            setSuccessMessage("Post created successfully!");
            setTitle("");
            setDescription("");
            setPrice("");
            setWillDeliver(false);
            // Optionally refresh posts after creation
            const APIResponse = await FetchAllData(`${BaseURL}/posts`);
            if (APIResponse.success) {
                setPost(APIResponse.data.posts);
            }
        } else {
            setError(result.error.message);
        }    
    };
    //Search Bar
    const postToDisplay = searchParams 
        ? post.filter(p => p.title.toLowerCase().includes(searchParams.toLowerCase()))
        : post;
        
 
    return (
        <>
        <h1>Recent Posts</h1>
    
        <div className="search-bar">
             <label>
            Search: {' '}
            <input type="text" placeholder="Search" onChange={(e) => setSearchParams(e.target.value)} />
             </label>
        </div>

            
        {isEditing ?
          (<EditPost
          editForm={editForm}
          setPost={setPost}
          
          title={title} setTitle={setTitle}
          description={description} setDescription={setDescription}
          price={price} setPrice={setPrice}
          willDeliver={willDeliver} setWillDeliver={setWillDeliver}

          handleChange={handleChange}
          handlePostUpdate={handlePostUpdate}
         
    />) :null}
        
             
             {post.map(post => 
             
             (<Post
             key={post._id}
             post={post}
             title={title} setTitle={setTitle}
             description={description} setDescription={setDescription}
             price={price} setPrice={setPrice}
             willDeliver={willDeliver} setWillDeliver={setWillDeliver}
             captureEdit={captureEdit}
             changeEditState={changeEditState}
             />)
                
            )} 
             
           
           <h1>Create New Post</h1>
            {tokenString && (
                <div className="new-post">
                    {successMessage && <p>{successMessage}</p>}
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Description:
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Price:
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </label>
                        <br />
                        <label>
                            Will Deliver:
                            <input type="checkbox" checked={willDeliver} onChange={(e) => setWillDeliver(e.target.checked)} />
                        </label>
                        <br />
                        <button style={{ border: "2px solid #242424", padding: "5px" }}>Submit New Post</button>
                    </form>
                </div>
            )}
                  
           
        </>
    )
    }



export default Posts;