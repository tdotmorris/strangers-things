import { useState, } from "react";
import { Link, useNavigate } from "react-router-dom";

const cohort = '2305-FTB-ET-WEB-PT';
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

export default function LogIn({ setToken }) {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
   
    
    async function handleSubmit(event) {
        event.preventDefault();
        navigate('/Profile')
        try {
            const APIResponse = await fetch(`${BaseURL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username,
                        password,
                    }
                })
            });

            const result = await APIResponse.json();
            console.log('Full API Response:', result);


            if (result.data && result.data.token) {
                
                localStorage.setItem('authToken', result.data.token);
               // Store the token in local storage
                setToken(result.data.token); // Store the token in App's state.
                setSuccessMessage(result.message);
                setUsername('');
                setPassword('');

                // Redirect to Profile route after successful login.
            } else {
                setError(result.error.message || "Unexpected error occurred."); // Handle potential server-side errors
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="login">
            <h1>Log In</h1>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: {' '}
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <br />
                <label>
                    Password: {' '}
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <br />
                <button>Log In</button>
            </form>
            <Link to={"/SignUp"} className='register'>Don't have an account yet? Sign Up</Link>
        </div>
    );
}
