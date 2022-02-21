import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";

export default function ScorePage(props) {
    let { id } = useParams();

    const [theScores, setTheScores] = useState([[]])

    useEffect(()=>{
        axios.get('http://localhost:8000/api/score/'+id, {
            headers: {
                "Authorization": localStorage.getItem('jwt')
            }
        })
        .then((response)=>{
            setTheScores(response.data);
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
        <h3 style={{margin: '20px auto'}}>Scores</h3>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Score</th>
                    <th scope="col">Questions Count</th>
                </tr>
            </thead>
            <tbody>
                {theScores.map((e,i)=>{
                    return <tr key={i}>
                        <th scope="row">{i+1}</th>
                        <td>{e.name}</td>
                        <td>{e.username}</td>
                        <td>{e.score}</td>
                        <td>{e.questions}</td>
                    </tr>
                })}
            </tbody>
            </table>
    </div>
  )
}
