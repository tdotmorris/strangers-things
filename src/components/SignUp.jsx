import { useState } from "react";
const cohort = '2305-FTB-ET-WEB-PT'
const BaseURL=`https://strangers-things.herokuapp.com/api/${cohort}`
import { useNavigate } from "react-router-dom";
import App from "../App";
import { ToastContainer } from "react-toastify";

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUxMGJiY2JlYjkzNTAwMTRjMmQxZWQiLCJ1c2VybmFtZSI6InN1cGVybWFuMjgiLCJpYXQiOjE2OTI0NzAyMDR9.LPdf-7kR0TXux8eTp3BAAf6p3Ro55ieUf-DHlLEz2Q0"

export default function SignUp({setToken}){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[fname,setFname]=useState("");
    const[lname,setLname]=useState("");
    const[successMessage,setSuccessMessage]=useState("");
    const[error, setError]=useState(null);
    const Navigate= useNavigate();
    //const notify=()=>("Thanks for signing up!")

    async function handleSubmit(event){
        event.preventDefault();
        Navigate('/Login')
        try {
            const APIResponse= await fetch(`${BaseURL}/users/register`,
            {
                method:'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    user: { 
                        fname,
                        lname,
                        //username:'superman30',
                        //password:'krypt0n0nbust',  
                        username,
                        password,
                    }
                })
            });
            const result= await APIResponse.json();
            console.log("SignUp Result:",result);
            setToken(result.data.token);
            setSuccessMessage(result.message);
            setFname('');
            setLname('');
            setUsername('');
            setPassword('');
            console.log('form submitted')
            return result;
        } catch (error) {
            setError(error.message)
        }
    }

return(
    <div>
        <h1>Create Your Profile</h1>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                First Name:{''}
                <input type="text" value={fname} onChange={(event)=>setFname(event.target.value)}/>
    
            </label>
            <label>
                Last Name:{''}
                <input type="text" value={lname}onChange={(event)=>setLname(event.target.value)}/>
            </label>
            <label>
                Create Username:{''}
                <input type="text" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </label>
            <label>
                Create Password:{''}
                <input type="text" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </label>
             {/* removed useNav temp onClick={()=>Navigate('/Login')} */}
            <button>
                Sign Up
            </button>
        </form>
    </div>
)
}
