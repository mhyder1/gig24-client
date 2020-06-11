import React, { Component } from "react";
import AppContext from "../AppContext";
import TokenService from "../../services/token-service";
import config from "../../config";
import clapper from "../../images/clapper.jpg";
import "./jshome.css";

export default class JsHome extends Component {
  static contextType = AppContext;

  state = {
    show: [],
  };

  getGigs = () => {
    const token = TokenService.hasAuthToken() ? 
                TokenService.readJwtToken() : 
                { user_id: "" }
    const { user_id } = token
    fetch(`${config.API_ENDPOINT}/jobs/gigs/${user_id}`)
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res.json();
        })
        .then((gigs) => {
            this.context.updateGigs(gigs)
        })
        .catch(error => console.e.log(error))
  }

  handleApply = (job_id) => {
    const token = TokenService.hasAuthToken() ? 
    TokenService.readJwtToken() : 
    { user_id: "" }
    const { user_id } = token

    fetch(`${config.API_ENDPOINT}/applied`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        job_id,
        completed: false,
        app_date: new Date()
      }),
    })
    .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((application) => {
          this.context.updateApplications(application)
          this.getGigs()
      })
      .catch(error => console.log(error))
  };

  handleWithdraw = (job_id) => {
    const token = TokenService.hasAuthToken() ? 
    TokenService.readJwtToken() : 
    { user_id: "" }
    const { user_id } = token
    
    fetch(`${config.API_ENDPOINT}/applied/${job_id}`, {
        method: 'DELETE',
      })
      .then(() => {
        this.context.removeApplication(user_id)
        // this.getGigs()
      })
      .catch(error => console.log(error))
  }

  handleClick = (index) => {
    let show = this.state.show.slice();
    show[index] = !show[index];
    this.setState({ show });
  };
  render() {
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return (
      <section
        className="js-home"
        style={{
          background: `url(${clapper})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 id='open'>Open gigs</h1>
        <ul className ='gig'>
          {this.context.gigs.map((gig, idx) => (
            <li key={idx}>
              <div >
                <h3 id ='position'>{gig.position}</h3>
                <p>Duration: {gig.title}</p>
                <p>Location: {gig.location}</p>
                {gig.js_id &&
                <p 
                style={{border:'1px solid gray', padding:'10px', width:'fit-content', margin: '10px auto', textAlign: 'left'}}>
                    Applied for: {gig.position} position<br/>
                    on: {new Date(gig.date).toLocaleString('en-us', options)}
                </p>
                }
                <button onClick={() => this.handleClick(idx)}>details</button>
                {gig.js_id ?
                    <button className='glow-on'
                        // onClick={() => this.handleWithdraw(gig.app_id)}
                        onClick={e =>
                            window.confirm("Are you sure you want to withdraw from this position?") &&
                            this.handleWithdraw(gig.app_id)
                        }
                        // disabled={gig.js_id}
                        >
                    withdraw
                    </button>
                :
                    <button className='glow-on'
                        onClick={() => this.handleApply(gig.id)}
                        // disabled={gig.js_id}
                        >
                    apply now
                    </button>
                }
                {this.state.show[idx] && (
                  <section>
                    <p>Project Details: {gig.description}</p>
                    <p>Duration: {gig.duration}</p>
                    <p>Pay: {gig.pay}</p>
                  </section>
                )}
              </div>
            </li>
          ))}
        </ul>
        </section>
    );
  }
}
