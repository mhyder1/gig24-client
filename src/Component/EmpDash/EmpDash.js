import React, { Component } from "react";
import config from '../../config';
import TokenService from '../../services/token-service'
import './EmpDash.css'


export default class EmpDash extends Component {

  state = {
    applicants:[],
    jobs:[]
  }


  componentDidMount() {
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {user_id:''}
 console.log(token)
    Promise.all([
      fetch(`${config.API_ENDPOINT}/applied/current/${token.user_id}`),
       fetch(`${config.API_ENDPOINT}/jobs/byuser/${token.user_id}`)
     ])
     .then(([appRes, jobsRes]) => {
       if (!appRes.ok) return appRes.json().then((e) => Promise.reject(e));
       if (!jobsRes.ok) return jobsRes.json().then((e) => Promise.reject(e));
       return Promise.all([appRes.json(), jobsRes.json()]);
     })
     .then(([applicants, jobs]) => {
      // console.log(applicants)
       console.log(jobs) 
      this.setState({ applicants, jobs });
     })
     .catch((error) => {
       console.log({ error })
     });
  }

  render() {
    return (
      <>
      <section>
          <header>
              <h1>Employee Dashboard</h1>
          </header>
          <article>
               <h3>Applicants</h3>
               
                 <ul>{this.state.applicants.map((applicant, user_id) => (
                    <li key={user_id}>
                      <p>{applicant.fullname}</p>
                      <p>{applicant.user_id}</p>
                    </li>
                 ))}
                </ul>
                  <br />
          </article>
          <article>
              <h3>My posts</h3>
                  <ul>
                    <div className="post-gig">
                    {this.state.jobs.map((job) => (
                      <li>
                        <h4>{job.position}</h4>
                        <p>{job.duration}</p>
                        <p>{job.location}</p>
                      </li>

                    ))}
                    </div>
                  </ul>
          </article>


      </section>
        
       
      </>
    );
  }
}
