import React, { Component } from "react";
import AppContext from '../AppContext';
import './EmpDash.css'


export default class EmpDash extends Component {
  static contextType = AppContext;


  render() {
    return (
      <>
      <section>
          <header>
              <h1>Employer Dashboard</h1>
          </header>
          <article>
               <h3>Applicants</h3>
               
                 <ul>{this.context.applicants.map((applicant, idx) => (
                    <li key={idx}>
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
                    {this.context.jobs.map((job, idx) => (
                      <li key={idx}>
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
