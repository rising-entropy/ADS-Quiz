import React from 'react'

export default function MainPage() {
  return (
    <div className="container container-fluid">
        <div className="row">
            <h3 style={{margin: '10px auto'}} className='text-center'>Welcome to College Quiz!</h3>
        </div>
        <div className="row text-center" style={{margin: '20px auto'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="card" style={{width: '100%', margin: '10px'}}>
                    <div class="card-body">
                        <h5 class="card-title">Student</h5>
                        <p class="card-text">Give and See results for quizzes curated by Teachers.</p>
                        <a href="/login" className="btn btn-primary">Get in!</a>
                    </div>
                </div>
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="card" style={{width: '100%', margin: '10px'}}>
                    <div class="card-body">
                        <h5 class="card-title">Teacher</h5>
                        <p class="card-text">Create and manage Quiz Questions for Students</p>
                        <a href="/login" className="btn btn-primary">Login</a>
                    </div>
                </div>
            </div>            
        </div>

    </div>
  )
}
