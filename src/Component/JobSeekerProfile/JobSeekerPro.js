import React, {Component} from 'react';
import AppContext from '../../Component/AppContext';


export default class JobSeekerPro extends Component {
    static contextType = AppContext;

render() {
    console.log(this.context)
    const {jsProfile} = this.context
    return(
        <>
        <h1>My profile</h1>
    <p>{jsProfile.name}</p>
    <p>{jsProfile.about_me}</p>
   

        </>
    )
}
}