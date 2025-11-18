'use client'
import React, {useRef, useState} from 'react';
import {loginAction} from "@/app/ServerActions/loginAction";
import {useRouter} from "next/navigation";
import Link from "next/link";


const LoginForm = () => {
    const [error, setError] = useState('')
    const router = useRouter()
    const userRef = useRef(null)
    const handleLogin=async (e)=>{
        e.preventDefault()
        const userData={
            userEmail: userRef.current.useremail.value,
            userPassword: userRef.current.userpassword.value,
        }
        try {
            const response = await loginAction(userData)
            console.log(response,'response');
            if(response.success){
                alert('Login successfully')
                router.push('/')
            }else{
                setError('Login failed')

            }
        }
        catch (error) {
            console.log(error,'thilak');
        }
    }
  return (
    <>
        <div className='formContainer'>
            <h1>Login Form</h1>
            {error && <p style={{color:'red'}}>{error}</p>}
            <form ref={userRef} onSubmit={handleLogin} className='formSection'>
                <h2>User Email</h2>
                <input type='email' name='useremail'/>
                <h2>User Password</h2>
                <input type='text' name='userpassword'/><br></br>
                <button>Login</button>
            </form>
            <Link href={'/register'}>New User? Register Here</Link>
        </div>
    </>
  );
};

export default LoginForm;
