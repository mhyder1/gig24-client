import React, { Component } from "react";
import AppContext from "../AppContext";
import config from "../../config";
import './jshome.css'

export default class JsHome extends Component {
  static contextType = AppContext;

  state = {
    show: [],
  };

  handleApply = (job_id) => {
    const { user_id } = this.context.userInfo;

    fetch(`${config.API_ENDPOINT}/applied`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        job_id,
        completed: false,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((appliedJob) => {
        console.log(appliedJob);
      });
  };

  handleClick = (index) => {
    console.log(index);
    let show = this.state.show.slice();
    show[index] = !show[index];
    this.setState({ show });
  };
  render() {
    console.log(this.context.gigs);
    return (
  
      <section className = 'js-home'>
        <h1 id='open'>Open gigs</h1>
        <ul>
          {this.context.gigs.map((gig, idx) => (
            <li key={idx}>
              <div className ='gig'>
                <h4 id ='position'>{gig.position}</h4>
                <p>{gig.duration}</p>
                <p>{gig.location}</p>
                <button onClick={() => this.handleClick(idx)}>details</button>
                <button className='glow-on'
                    onClick={() => this.handleApply(gig.id)}
                    disabled={gig.js_id}
                    >
                  apply now
                </button>
                {this.state.show[idx] && (
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proiden
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        </section>
 
    );
  }
}
