import React from 'react'

export default function StudentPage() {
  return (
    <div className='container container-fluid text-center'>
        <h3 style={{margin: '30px auto'}}>Student Page</h3>
        









        <button style={{margin: '30px auto'}} className='btn btn-danger' onClick={(e)=>{
            localStorage.setItem('jwt', '');
            alert("Logged out Successfully!");
            window.location='/';
        }}>Logout</button>
    </div>
  )
}
