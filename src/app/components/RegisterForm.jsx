"use client"
import React, {useRef} from 'react';
import {registerAction} from "@/app/ServerActions/userAction";
import Link from "next/link";
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const userRef = useRef(null)
    const router = useRouter()
    const handleRegistration = async (e) => {
        e.preventDefault();

        const userName = userRef.current.username.value
        const userPassword = userRef.current.userpassword.value
        const userEmail = userRef.current.useremail.value
        const registratonDetails = {
            userName: userName,
            userEmail: userEmail,
            userPassword: userPassword,
        }
        try {
            const response = await registerAction(registratonDetails)
            if(response?.status === 'success') {
                alert('User Registration successfull.')
                router.push('/login')
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <div className='formContainer'>
                <form ref={userRef} onSubmit={handleRegistration} className='formSection'>
                    <h1>Reguster Form</h1>
                    <h2>User Name</h2>
                    <input type='text' name='username'/>
                    <h2>User Email</h2>
                    <input type='email' name='useremail'/>
                    <h2>User Password</h2>
                    <input type='text' name='userpassword'/><br></br>
                    <button>Register</button>
                </form>
                <Link href="/login">Already Register? Click Login</Link>
            </div>

        </>
    );
};

export default RegisterForm;
