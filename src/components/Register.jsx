
import { useState } from 'react';
import { registerUser } from "../API"; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerUser(username, password);
        if (result && result.success) {
            sessionStorage.setItem('token', result.data.token); 
            navigate('/Login');
        } else {
            if (result.error && result.error.name === 'UserExists') {
                alert('User already exists, please login instead.');
                // Optionally, you can navigate them to the login page
                // navigate('/Login');
            } else {
                console.log("Error during registration");
            }
        }
    };
            
   

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
