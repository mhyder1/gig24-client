import React, { Component } from "react";
import DayTimePicker from '../DateTimePicker/DayTimePicker'


export default class AddEvents extends Component {
  render() {
    return (
      <>
        <h2>Add your event</h2>
        <p>Choose date and time:</p>
          <DayTimePicker /> 
        <form>
          <label>Parent Name</label> <br />
          <input type="text" name="parentName" value="" required />
          <br />
          <label>Event title</label> <br />
          <input type="text" name="title" value="" required />
          <br/>
          <label>Describe your event</label>
          <br />
          <textarea type="text" value="" name="description" required />
          <br />
          <input type="submit" value="add event" />
        </form>
      </>
    );
  }
}
