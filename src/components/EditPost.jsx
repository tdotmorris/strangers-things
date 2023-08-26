import { useEffect,useState } from "react";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import { FetchAllData } from "../API";

const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

export default function EditPost({postId,token,editForm,title,description,price,willDeliver,handlePostUpdate,setTitle,setDescription,setPrice,setWillDeliver,handleChange,setPost}){
    const tokenString = localStorage.getItem('authToken'); 
    //const {postId}=useParams();
    editForm={title,description,price,willDeliver}
    const[successMessage,setSuccessMessage]=useState("")
    const [error, setError] = useState(null);

    /*function handleEditForm(e) {
        e.preventDefault();
        fetch(`${BaseURL}/posts/${postId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(editForm),
        })
            .then(resp => resp.json())
            .then(updatedPost => {
                handlePostUpdate(updatedPost)})
    }


    const updatePost = async (postId, postData) => {
        try {
          const response = await fetch(`${BaseURL}/posts/${postId}`, {
            method: "PATCH", // or "PUT" depending on your API
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
          });
          const result = await response.json();
          return result;
        } catch (error) {
          console.error(error);
          return { success: false, error: error.message };
        }
      };*/

      console.log(postId)

const UpdatePost=async (postData)=>{
console.log("is token being use:", tokenString)

    try{
        const response= await fetch(`${BaseURL}/posts/${postId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${tokenString}`,
            },
            body:JSON.stringify((editForm,postData),{
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
            

            {tokenString && (
                <div className="edit-post">
                    <h2>Edit Post</h2>
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
                   <button style={{ border: "2px solid #242424", padding: "5px" }}> Submit Update </button>

                    </form>
                </div>
            )}
    </>
)}
