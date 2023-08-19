import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

/*async function handleSubmit(e){
    e.preventDefault();
    try {
        const response=
    } catch (error) {
        
    }
}*/
    return(
    <div>
        <h1>Log In</h1>
        <form>
            <label>
                Username:{''}
                <input value="username"/>
            </label>
            <label>
                Password:{''}
                <input value="password"/>
            </label>
            <button>Log In</button>
        </form>
        <Link to={"/Register"}className='register'>Register Now</Link>
    </div>
)
}
