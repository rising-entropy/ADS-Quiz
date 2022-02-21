import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

export default function AddQuestion(props) {

    const [formData, setFormData] = useState({}); 

    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    const submitHandler = (e) => {
        e.preventDefault();
        let body = formData
        body['quizID'] = props.quizID
        axios.post('http://localhost:8000/api/questions', body, {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            if(response.data.status === '201 OK')
            {
                alert('Question Added Successfully!');
                window.location = '/quiz/'+props.quizID;
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
    <div className="container container-fluid card" style={{margin: '20px auto'}}>
        <h4 style={{margin: '10px auto'}}>Add Question:</h4>
        <form onSubmit={submitHandler}>
            <input onChange={onChangeHandler} placeholder='Question' className='form-control' type="text" name='question' id='question' required /><br />
            <input onChange={onChangeHandler} placeholder='Image Link' className='form-control' type="text" name='imageLink' id='imageLink' /><br />
            <input onChange={onChangeHandler} placeholder='Option 1' className='form-control' type="text" name='option1' id='option1' required /><br />
            <input onChange={onChangeHandler} placeholder='Option 2' className='form-control' type="text" name='option2' id='option2' required /><br />
            <input onChange={onChangeHandler} placeholder='Option 3' className='form-control' type="text" name='option3' id='option3' required /><br />
            <input onChange={onChangeHandler} placeholder='Option 4' className='form-control' type="text" name='option4' id='option4' required /><br />
            <input onChange={onChangeHandler} placeholder='Correct Answer' className='form-control' type="text" name='correctAnswer' id='correctAnswer' required /><br />
            <button style={{margin: '10px auto'}} type="submit" className='btn btn-success'>Add Question</button>
        </form>
    </div>
  )
}
