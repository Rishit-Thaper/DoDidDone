import React, { useState } from 'react'

function Login() {
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        console.log(email, password);
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            {/* <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='name' /> */}
            <input type="email" required placeholder='email'onChange={(e)=>{setEmail(e.target.value)}} />    
            <input type="password" required placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit"></button>
        </form>
    </div>
  )
}

export default Login