import React from 'react'
import './App.css'
import SignupSigninComponent from '../SignupSignin'
import Header from '../components/Header'

const Signup = () => {
  return (
    <div>
        <Header />
        <div className="wrapper">
            <SignupSigninComponent />
        </div>
    </div>
  )
}

export default Signup;