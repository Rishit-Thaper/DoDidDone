import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';

function Login() {
  const {login, err, load} = useLogin();
  // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        await login(email, password)
        console.log(email, password);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            {/* <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='name' /> */}
            <input type="email" required placeholder='email'onChange={(e)=>{setEmail(e.target.value)}} value={email} />    
            <input type="password" required placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} value ={password}/>
            <button type="submit">Login</button>  
            {err && <p>{err}</p>}
        </form>
    </div>
  )
}

export default Login