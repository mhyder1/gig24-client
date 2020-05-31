import React, { Component } from "react";
import AppContext from "../AppContext";
import config from '../../config'


export default class JsHome extends Component {
    static contextType = AppContext
   
    state= {
        show: false
    }

    handleApply =(job_id) => {
       const  {user_id} = this.context.userInfo
        
        fetch(`${config.API_ENDPOINT}/applied`, {
           method : "POST",
           headers: {
               'content-type': 'application/json' 
           },
           body:JSON.stringify({
               user_id,
               job_id,
               completed: false
           })
        })
        .then(res => {
            if (!res.ok) return res.json().then((e) => Promise.reject(e));
            return res.json()    
        })
        .then(appliedJob => {
            console.log(appliedJob)
        })
    }

    handleClick =(e)=> {
        this.setState({
            show: !this.state.show
        })
    }
    render() {
        return (
          <>
            <h1>JsHome</h1>
                <ul>
                  {this.context.gigs.map((gig, idx) => (
                    <li key={idx}>
                      <div>
                       
                          <h4>{gig.position}</h4>
                        
                          <p>{gig.duration}</p>
                          <p>{gig.location}</p>
                          <button onClick={this.handleClick}>details</button>
                          <button onClick={()=>this.handleApply(gig.id)}>apply now</button>
                          { this.state.show &&
                              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proiden</p>
                          }
                      </div>
                    </li>
                  ))}
                </ul>
                <hr/>
                <h2>applied jobs</h2>
          </>
        );
    }
}
