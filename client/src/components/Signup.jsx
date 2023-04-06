import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {

  const backendLink = process.env.REACT_APP_BACKEND_LINK

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${backendLink}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    })

    if (response.status !== 200) {
      alert('Failed: Registration')
    } else {
      alert('Signup Successful')
    }
  }

  return (
    <main className='mt-5'>
      <h2>Create Account - Ai Blog</h2>
      <form className='mt-3' onSubmit={handleSignup}>
        <div className="my-2">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" value={username} onChange={e => setUsername(e.target.value)} name="name" aria-describedby="emailHelp" placeholder='Your Full Name' />
        </div>
        <div className="my-2">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} name="email" aria-describedby="emailHelp" placeholder='Your E-mail address' />
        </div>
        <div className="my-2">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} name="password" minLength="5" required="" placeholder='New Password' />
        </div>
        <div className="my-2">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} name="cpassword" minLength="5" required="" placeholder='Confirm Password' />
        </div>
        <div className="d-flex align-items-center my-3">
          <button type="submit" className="btn btn-primary">Submit</button>
          <p className="mx-2 my-0">Already member - <Link to="/login">Login to Ai Blog</Link></p>
        </div>
      </form>
    </main>
  )
}

export default Signup
