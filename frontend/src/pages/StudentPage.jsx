import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default function StudentPage() {

    const [theQuizzes, setTheQuizzes] = useState([])
    const [name, setName] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:8000/api/quizzes', {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            setTheQuizzes(response.data);
        })
        .catch((err)=>{
            console.log(err)
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        });
    }, []);


  return (
    <div className='container container-fluid text-center'>
        <h3 style={{margin: '30px auto'}}>Student Page</h3>
        
        <h4 style={{margin: '20px auto'}}>Quizzes</h4>

        <div className="container container-fluid">
            {theQuizzes.map((e, i)=>{
            let link = "/student-quiz/"+e.id
            return <div class="card" style={{margin: '10px auto'}}>
                <div key={i} class="card-body">
                <a target="_blank" href={link} rel="noreferrer">{e.name}</a>
                </div>
            </div>})}
        </div>


        <button style={{margin: '30px auto'}} className='btn btn-danger' onClick={(e)=>{
            localStorage.setItem('jwt', '');
            alert("Logged out Successfully!");
            window.location='/';
        }}>Logout</button>
    </div>
  )
}
