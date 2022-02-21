import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default function LoginPage() {

    const [usernameHandler, setUsernameHandler] = useState("");
    const [passwordHandler, setPasswordHandler] = useState("");


    const loginHandler = (e) => {
        e.preventDefault();
        let body = {
            username: usernameHandler,
            password: passwordHandler
        }
        console.log(body)
        axios.post("http://localhost:8000/api/login", body)
        .then((response)=>{
            if(response.data.status == "200 OK")
            {
                let theJWT = response.data.token;
                localStorage.setItem('jwt', theJWT);
                alert("Logged In!");
                let decodedJWT = jwt_decode(theJWT);
                console.log(decodedJWT)
                if(decodedJWT.role === 'teacher')
                {
                    window.location='/teacher'
                }
                else
                {
                    window.location='/student'
                }
            }
            else
            {
                alert("Invalid Username/Password")
            }
        })
        .catch((err)=>{
            console.log(err)
            alert("Invalid Username/Password")
        })
    }




  return (
    <div className="container container-fluid text-center">
        <div className="card" style={{margin: '30px auto'}}>
            <h5 className="card-header">Login</h5>
            <div className="card-body">
                <form onSubmit={loginHandler}>
                    <div className="form-row">
                        <div className="form-group col-lg-12 col-md-12 col-sm-12" style={{margin: '10px auto'}}>
                            <label for="inputEmail4">Username</label>
                            <input autoComplete={false} onChange={(e)=>{setUsernameHandler(e.target.value)}} name='username' type="text" className="form-control" id="username" placeholder="Email" required />
                        </div>
                        <div className="form-group col-lg-12 col-md-12 col-sm-12" style={{margin: '10px auto'}}>
                            <label for="inputPassword4">Password</label>
                            <input autoComplete={false} onChange={(e)=>{setPasswordHandler(e.target.value)}} type="password" className="form-control" id="inputPassword4" placeholder="Password" required />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{margin: '10px auto'}}>Login</button>
                </form>
            </div>
        </div>
    </div>
  )
}
