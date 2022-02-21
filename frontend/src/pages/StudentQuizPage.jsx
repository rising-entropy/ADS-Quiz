import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

export default function StudentQuizPage() {
    let { id } = useParams();
    const [questions, setQuestions] = useState([])
    const [quizName, setQuizName] = useState("")
    const [formData, setFormData] = useState({});

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

    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    const submitHandler = (e) => {
        e.preventDefault();
        let body = {
            answers: formData
        }
        console.log(body)
        axios.post('http://localhost:8000/api/quiz/'+id, body, {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            alert('Quiz Submitted Successfully!');
            alert('Your Score is: '+response.data.score+'/'+response.data.questions)
            window.location = '/student';
        })
        .catch((err)=>{
            console.log(err)
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        })
    }

  return (
    <div className="container container-fluid text-center">
        <h3 style={{margin: '20px auto'}}>Quiz Name: &nbsp;&nbsp;<u>{quizName}</u></h3>
        <form onSubmit={submitHandler}>
            {questions.map((e, i)=>{
                return <div className='container container-fluid' style={{margin: '20px auto'}}>
                    <p>{e.question}</p>
                    {e.imageLink.length > 0 ? <img alt='image' src={e.imageLink} width={300} /> : <></>}
                    <br />
                    <input onChange={onChangeHandler} type="radio" id={e.id+e.option1} name={e.id} value={e.option1}/>
                    <label for={e.id+e.option1}>{e.option1}</label><br/>
                    <input onChange={onChangeHandler} type="radio" id={e.id+e.option2} name={e.id} value={e.option2}/>
                    <label for={e.id+e.option2}>{e.option2}</label><br/>
                    <input onChange={onChangeHandler} type="radio" id={e.id+e.option3} name={e.id} value={e.option3}/>
                    <label for={e.id+e.option3}>{e.option3}</label><br/>
                    <input onChange={onChangeHandler} type="radio" id={e.id+e.option4} name={e.id} value={e.option4}/>
                    <label for={e.id+e.option4}>{e.option4}</label><br/>
                </div>
            })}
            <br />
            <button style={{margin: '20px auto'}} type="submit" className='btn btn-success'>Submit Quiz</button>
        </form>
    </div>
  )
}
