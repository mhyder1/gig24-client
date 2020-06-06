import React, { Component } from "react";
import AppContext from "../AppContext";
//import { Link } from "react-router-dom";
import config from '../../config'
import blue from '../../images/blue.jpg'
import "./EmpDash.css";

export default class EmpDash extends Component {
  static contextType = AppContext;

  deletePost = (id) => {
    
    fetch(`${config.API_ENDPOINT}/jobs/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      this.context.deleteEmpJob(id)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div
        className="empdash"
        style={{
          background: `url(${blue})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <section>
          <article>
            <h2 id="posts">MY POSTS</h2>
            <ul className="e-dash">
                {this.context.jobs.map((job, idx) => (
                  <li key={idx}>
                  <button className="delete"
                    onClick={e =>
                        window.confirm("Are you sure you want to delete this post?") &&
                        this.deletePost(job.id)
                    }
                  >
                    Delete
                  </button>
                    <h4>{job.position}</h4>
                    <p>{job.duration}</p>
                    <p>{job.location}</p>
                    <p>{job.term}</p>
                    <p>{job.pay}</p>
                    <p>{job.description}</p>
                    {/* <p>{job.id}</p> */}
                  </li>
                ))}
            </ul>
          </article>
          <article>
            <h2 id="applicants">APPLICANTS</h2>
            <ul className="e-applicants">
                {this.context.applicants.map((applicant, idx) => (
                  <li key={idx}>
                    <p>{applicant.fullname}</p>
                    <p>{applicant.education}</p>
                    <p>{applicant.user_id}</p>
                    {/* <p>{applicant.skillset}</p>
                  <p>{applicant.about_me}</p>
                  <p>{applicant.location}</p> */}
                  </li>
                ))}
            </ul>
          
          </article>
        </section>
      </div>
    );
  }
}
