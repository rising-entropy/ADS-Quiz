import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

export default function IndividualQuestion(props) {

    const [formData, setFormData] = useState(props.question);

    console.log(props.question)

    const onChangeHandler = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    const submitHandler = (e) => {
        e.preventDefault();
        let body = {...formData}
        body['quizID'] = props.quizID
        axios.put('http://localhost:8000/api/question/'+formData['id'], body, {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            if(response.data.status === '200 OK')
            {
                alert('Question Updated Successfully!');
                window.location = '/quiz/'+props.quizID;
            }
        })
        .catch((err)=>{
            console.log(err)
            return
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        })
    }

    const deleteHandler = (e) => {
        axios.delete('http://localhost:8000/api/question/'+formData['id'], {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            if(response.data.status === '200 OK')
            {
                alert('Question Deleted Successfully!');
                window.location = '/quiz/'+props.quizID;
            }
        })
        .catch((err)=>{
            console.log(err)
            alert("Some error occurred!")
            localStorage.setItem('jwt', '')
            window.location='/'
        })
        window.location='/quiz/'+props.quizID
    }


  return (
    <div className="card container container-fluid" style={{padding: '10px auto', margin: '10px auto'}}>
        <form onSubmit={submitHandler}>
            <input defaultValue={props.question['question']} onChange={onChangeHandler} placeholder='Question' className='form-control' type="text" name='question' id='question' required /><br />
            <input defaultValue={props.question['imageLink']} onChange={onChangeHandler} placeholder='Image Link' className='form-control' type="text" name='imageLink' id='imageLink' /><br />
            <input defaultValue={props.question['option1']} onChange={onChangeHandler} placeholder='Option 1' className='form-control' type="text" name='option1' id='option1' required /><br />
            <input defaultValue={props.question['option2']} onChange={onChangeHandler} placeholder='Option 2' className='form-control' type="text" name='option2' id='option2' required /><br />
            <input defaultValue={props.question['option3']} onChange={onChangeHandler} placeholder='Option 3' className='form-control' type="text" name='option3' id='option3' required /><br />
            <input defaultValue={props.question['option4']} onChange={onChangeHandler} placeholder='Option 4' className='form-control' type="text" name='option4' id='option4' required /><br />
            <input defaultValue={props.question['correctAnswer']} onChange={onChangeHandler} placeholder='Correct Answer' className='form-control' type="text" name='correctAnswer' id='correctAnswer' required /><br />
            <button style={{margin: '10px auto'}} type="submit" className='btn btn-success'>Update Question</button>
        </form>

        <button style={{margin: '10px auto'}} onClick={deleteHandler} className='btn btn-danger'>Delete Question</button>
    </div>
  )
}
