import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

export default function StudentQuizPage() {
    let { id } = useParams();
    const [questions, setQuestions] = useState([])
    const [quizName, setQuizName] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:8000/api/quiz/'+id, {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            setQuestions(response.data.questions);
            setQuizName(response.data.name)
        })
        .catch((err)=>{
            console.log(err)
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        });
    }, []);

  return (
    <div className="container container-fluid text-center">
        <h3>Quiz Name: &nbsp;&nbsp;<u>{quizName}</u></h3>

    </div>
  )
}
