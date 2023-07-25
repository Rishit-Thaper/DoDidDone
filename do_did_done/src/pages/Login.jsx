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
    <div className='account'>
      <div className="intro">
        <h1>Do <br />Did <br /> Done!!!</h1>
        <h1 id='hidden'>Do Did Done!!!</h1>
        <h2>Start Doing from where you left</h2>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
            {/* <input type="text" required onChange={(e)=>{setName(e.target.value)}} placeholder='Name' value={name}/> <br /> */}
            <input type="email" required placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}} value={email} />   <br /> 
            <input type="password" required placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/> <br />
            <button className='doIt' disabled={load} type="submit">Register</button>
            {err && <div className='error'>{err}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login