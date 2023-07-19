import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, load, err} = useSignup()
    const handleSubmit = async (e) =>{
      
      e.preventDefault();

      await signup(name, email, password)
      console.log(email, password);
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='name' value={name}/>
            <input type="email" required placeholder='email'onChange={(e)=>{setEmail(e.target.value)}} value={email} />    
            <input type="password" required placeholder='password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
            <button disabled={load} type="submit">Register</button>
            {err && <div>{err}</div>}
        </form>
    </div>
  )
}

export default SignUp