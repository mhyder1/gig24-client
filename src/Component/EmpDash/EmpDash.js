import React, { Component } from "react";
import AppContext from "../AppContext";
//import { Link } from "react-router-dom";
import config from '../../config'
import blue from '../../images/blue.jpg'
import "./EmpDash.css";

export default class EmpDash extends Component {
  static contextType = AppContext;

  state = {
    profile: {},
    show: []
  }

  deletePost = (id) => {
    
    fetch(`${config.API_ENDPOINT}/jobs/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      this.context.deleteEmpJob(id)
    })
    .catch(error => console.log(error))
  }

  getUserProfile = (user_id) => {
    console.log(user_id)
    fetch(`${config.API_ENDPOINT}/userprofile/user/${user_id}`)
    .then(res => res.json())
    .then(profile => {
      console.log(profile)
      this.setState({profile})
    })
    .catch(error => console.log(error))
  }

  handleClick = (index, user_id) => {
    let show = this.state.show.slice();
    show[index] = !show[index];
    this.getUserProfile(user_id)
    this.setState({ show });
  };

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
                    <p>
                      <span 
                        style={{cursor: 'pointer', textDecoration: 'underline'}}
                        onClick={()=>this.handleClick(idx, applicant.user_id)}>
                          {applicant.fullname}
                      </span> applied to {applicant.position}
                    </p>
                    {this.state.show[idx] && (
                      this.state.profile &&
                      <section>
                        <p>About me: {this.state.profile.about_me}</p>
                        <p>Education: {this.state.profile.education}</p>
                        <p>Phone: {this.state.profile.phone}</p>
                        <p>Email: {this.state.profile.email}</p>
                        <p>Skillset: {this.state.profile.skillset}</p>
                        <p>Location: {this.state.profile.location}</p>
                        <p>IMDB: {this.state.profile.imdb}</p>
                      </section>
                    )}
                  </li>
                ))}
            </ul>
          
          </article>
        </section>
      </div>
    );
  }
}
