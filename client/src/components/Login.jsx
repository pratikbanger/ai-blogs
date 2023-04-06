import React, { useState } from 'react'
import './CSS/Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const backendLink = process.env.REACT_APP_BACKEND_LINK

  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${backendLink}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('userName', json.userName);
      if (json.isAdmin) {
        localStorage.setItem('admin', json.isAdmin);
      }
      navigate('/');
      // window.location.reload(true);
    } else {
      alert('Invalid Credentials')
    }
  }

  return (
    <main className='mt-5'>
      <h2>Login to Ai Blogs</h2>
      <form className='mt-4' onSubmit={handleLoginSubmit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <div className="d-flex align-items-center my-3">
          <button type="submit" className="btn btn-primary">Submit</button>
          <p className="mx-2 my-0">New to Ai Blogs - <a href="/signup">Create a Account</a></p>
        </div>
      </form>
    </main>
  )
}

export default Login
