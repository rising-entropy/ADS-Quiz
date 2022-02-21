import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";

export default function TeacherPage() {

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

    const submitHandler = (e) =>{
        e.preventDefault();
        let body = {
            name
        }
        axios.post('http://localhost:8000/api/quizzes', body, {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            if(response.data.status === '201 OK')
            {
                alert('Quiz Added Successfully!');
                window.location = '/teacher';
            }
        })
        .catch((err)=>{
            console.log(err)
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        })
    }

  return (
    <div className='container container-fluid'>
        <h3 style={{margin: '30px auto'}}>Teacher Page</h3>

        <div style={{margin: '10px auto'}} className="container container-fluid">
            <form onSubmit={submitHandler}>
                <input placeholder='Name' type="text" name="name" required id="name" onChange={(e)=>{
                    setName(e.target.value)
                }} className="form-control" />
                <button style={{margin: '10px auto'}} className='btn btn-success' type="submit">Add Button</button>
            </form>
        </div>
        
        <h4 style={{margin: '20px auto'}}>Quizzes</h4>

        <div className="container container-fluid">
            {theQuizzes.map((e, i)=>{
            let link = "/quiz/"+e.id
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
