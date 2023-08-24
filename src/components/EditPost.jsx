import { useEffect,useState } from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { FetchAllData } from "../API";

const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

export default function EditPost({token,editForm,title,description,price,willDeliver,handlePostUpdate,setTitle,setDescription,setPrice,setWillDeliver,handleChange,setPost}){
    const tokenString = localStorage.getItem('authToken'); 
    const {postId}=useParams();
    //editForm={title,description,price,willDeliver}
    const[successMessage,setSuccessMessage]=useState("")
    const [error, setError] = useState(null);

    /*function handleEditForm(e) {
        e.preventDefault();
        fetch(`${BaseURL}/posts/${POST_ID}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${tokenString}`,
            },
            body: JSON.stringify(editForm),
        })
            .then(resp => resp.json())
            .then(updatedPost => {
                handlePostUpdate(updatedPost)})
    }*/
const UpdatePost=async ()=>{

    try{
        const response= await fetch(`${BaseURL}/posts/${postId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            body:JSON.stringify((editForm),{
                post: {
                    title: {title},
                    description: {description},
                    price: {price},
                    willDeliver: {willDeliver}
                }
            })
        });
        const result=await response.json()
        console.log(result.data.post)
        return result.data.post
        .then(updatedPost=>{
            handlePostUpdate(updatedPost)})
    }catch(error){
        console.log(error);
    return {success: false, error:error.message}}
};

    const handleEditForm=async(e)=>{
        e.preventDefault();
        
        if (!tokenString) {
            setError("You must be logged in to make a post.");
            return;
        }

        const result= await UpdatePost();
        if (result && result.success) {
            setSuccessMessage("Post updated successfully!");
            setTitle("");
            setDescription("");
            setPrice("");
            setWillDeliver(false);
            // Optionally refresh posts after creation
        const APIResponse = await FetchAllData(`${BaseURL}/posts`);
        if (APIResponse.success) {
            setPost(APIResponse.data.posts);
        }
    }else{setError(result.error.message);

    }
    }

    
    return(
        <>
            <h1>Edit Post</h1>
             
            {tokenString && (
                <div className="edit-post">
                    <form onSubmit={handleEditForm}>
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
                   <button>Confirm Changes</button>
               
                    </form>
                </div>
            )}
    </>
)}
