import React, { Component } from "react";
import AppContext from "../../Component/AppContext";
import './empprofile.css'

export default class EmpProfile extends Component {
  static contextType = AppContext;

  render() {
      console.log(this.context)
      const {empPros} = this.context
    return (
      <section id='empprofile'>
        <p>{empPros.company_name}</p>
        <p>{empPros.about_us}</p>
        <p>{empPros.email}</p>
        <p>{empPros.location}</p>
        <p>{empPros.website}</p>
        <p>{empPros.phone}</p>
       
      </section>
    );
  }
}
