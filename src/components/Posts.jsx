import { useSearchParams } from "react-router-dom";
import { FetchAllData } from "../API"
import React, {useState, useEffect } from 'react';
const cohort = '2305-FTB-ET-WEB-PT'
const BaseURL=`https://strangers-things.herokuapp.com/api/${cohort}`
//const tokenString= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUxMGY5MmJlYjkzNTAwMTRjMzg2MzUiLCJ1c2VybmFtZSI6InN1cGVybWFuMzAiLCJpYXQiOjE2OTI0NzExODZ9.NZKPRcqxYRxX8so2l7FEJGMA9-O0IlHYjBk-PtWtFGM"

const Posts = ({token}) => {
    
    
    const[post, setPost]=useState([])
    const[error, setError]=useState(null)
    const[searchParams,setSearchParams]=useState("")
    // const searchParams=useSearchParams
    // create new post variables
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [price, setPrice] = useState("");
  
    // delivery button
    const [willDeliver, setWillDeliver] = useState(false);
    
 
    
        

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

        // trying to retrieve the token from localStorage
     
        
      

     const makePost = async()=>{
        try { const response= await fetch(`${BaseURL}/posts`,
        { 
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            post:{
              title: "My favorite stuffed animal",
              description:"This is a pooh doll from 1990",
              price: "$1000",
              willDeliver: 'True',
            }
          })
        });
          const result= await response.json();
          console.log("Received Token:", result.data.token);
          localStorage.getItemItem('authtoken', result.data.token)
          console.log(result);
          return result
        } catch (error) {
          console.log(error)
        }
      };
      makePost();

   /*   const editPost = async()=>{
        try { 
          const response= await fetch(`${BaseURL}/posts/POST_ID`,
        { 
          method:'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            post:{
              title: "My favorite stuffed animal",
              description:"This is a pooh doll from 1990",
              price: "$1000",
              willDeliver: 'True',
            }
          })
        });
          const result= await response.json();
          console.log(result);
          return result
        } catch (error) {
          console.log(error)
        }
      };
      editPost();*/
      

    //const postToDisplay=post
        const postToDisplay=useSearchParams ? post.filter((post)=>
        post.title.toLowerCase().includes(searchParams)) : post;
    
    return (
        <>

        {/* create new post */}
        <div className = "new-post">
        <h2>Create New Post</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {/* ORIGINAL = <form onSubmit={handleSubmit}> but I had to get rid of the handleSubmit temporarily */}
      <form>
        <label>
          Title:{" "}
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);}}
          />
        </label>
        <label>
          Price:{" "}
          <input 
            type="text"
            placeholder="$0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        {/* delivery button */}
        <label>
          Will Deliver:
          <label>
            <input
              type="radio"
              value="true"
              name="willDeliver"
              checked={willDeliver === true}
              onChange={() => setWillDeliver(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              name="willDeliver"
              checked={willDeliver === false}
              onChange={() => setWillDeliver(false)}
            />
            No
          </label>
        </label>

        <button style = {{border: "2px solid #242424", padding: "5px"}}>Submit New Post</button>
      </form>
      <button style = {{border: "2px solid #242424", padding: "5px"}}>Edit Post</button>
      </div>

      {/* end of create new post */}
  
        <h1>Posts</h1>
        
        <div>
            <label>
                Search: {''}
                <input type="text" placeholder="Search" onChange={(e)=>setSearchParams(e.target.value.toLowerCase())} />
            </label>
        </div>

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