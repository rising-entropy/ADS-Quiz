import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import AddQuestion from '../components/AddQuestion';
import IndividualQuestion from '../components/IndividualQuestion';

export default function IndividualQuizPage() {
    let { id } = useParams();

    const updateAlert = () => {
        alert('Question Updated Successfully!');
        window.location = '/quiz/'+id;
    }

    console.log(id)

    const [theQuestions, setTheQuestions] = useState([]);


    useEffect(()=>{
        axios.get('http://localhost:8000/api/questions', {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            setTheQuestions(response.data);
        })
        .catch((err)=>{
            console.log(err)
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        });
    }, []);


  return (
    <div className="container container-fluid">
        <div style={{margin: '10px auto'}}>
            <a href={"/score/"+id} target="_blank" rel="noreferrer"><button className='btn btn-primary'>Scores</button></a>
        </div>
        <div style={{margin: '10px auto'}}>
            <AddQuestion quizID={id} />
        </div>
        <div className="container container-fluid">
            {theQuestions.map((e, i)=><IndividualQuestion updateAlert={updateAlert} key={i} quizID={id} question={e} />)}
        </div>
    </div>
  )
}
