import { useState } from "react";
const cohort = '2305-FTB-ET-WEB-PT'
const BaseURL=`https://strangers-things.herokuapp.com/api/${cohort}`
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LogIn(){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[fname,setFname]=useState("");
    const[lname,setLname]=useState("");
    const[successMessage,setSuccessMessage]=useState("");
    const[error, setError]=useState(null);
    const Navigate= useNavigate();
    
    async function handleSubmit(event){
        event.preventDefault();
        try {
            const APIResponse= await fetch(`${BaseURL}/users/register`,
            {
                method:'POST',
                headers: {
                    'content-type':'application/json',
                },
                body: JSON.stringify({
                    user: { 
                        fname:"",
                    lname:"",
                    username:"",
                    password:"",  
                    }
                })
            });
            const result= await APIResponse.json()
            setSuccessMessage(result.message)
            setFname('')
            setLname('')
            setUsername('')
            setPassword('')
            console.log("SignUp Result:",result);
            //return result;
        } catch (error) {
            setError(error.message)
        }
    }

return(
    <div>
        <h1>Log In</h1>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username:{''}
                <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </label>
            <label>
                Password:{''}
                <input type="text" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </label>
            <button onClick={()=>Navigate('/Profile/')} >
                Sign In
            </button>
        </form>
        <Link to={"/SignUp"}className='register'>Sign Up Now</Link>
    </div>
)
}




  

