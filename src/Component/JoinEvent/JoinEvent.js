import React, { Component } from "react";
import AppContext from '../Context/AppContext'
import TokenService from '../../services/token-service'
import config from '../../config'

export default class JoinEvent extends Component {
static contextType = AppContext

  state = {
    children: 0,
    event_id: null
  }

  componentDidMount() {
    const { event } = this.props.location.state
    this.setState({
        event_id: event.id
    })
  }

  handleChange =(e) => {

    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  onChange = (date) => {
    this.setState({
      time_of_event: date,
    });
  }

  handleSelect = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  handleAddress = (suggestion) => {
    const {name, city, administrative, postcode} = suggestion
    this.setState({
      address: `${name}, ${city}, ${administrative} ${postcode}`
    })
  }

  handleSubmit =(e)=> {
    const token = TokenService.hasAuthToken() ? TokenService.readJwtToken() : {fullname:'',user_id:''}
    e.preventDefault()
    fetch(`${config.API_ENDPOINT}/attend`,{
      method:'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        children: this.state.children,
        guest: token.user_id,
        event:this.state.event_id,
      }),
    })
    .then((res)=> {
      if(!res.ok) return res.json().then((e)=> Promise.reject(e));
      return res.json();
    })
    .then((attend)=> {
        console.log(attend)
    //   this.context.addEvent(event)
    //   this.props.history.push(`/my-events`);
    })
    .catch((error) => {
      console.log({error});
    });
  }

  render() {
    return (
      <>
        <h2>Join this event</h2>
        <form onSubmit ={this.handleSubmit}>
        <label>How many children?</label><br/>
          <select name="children" required
                onChange={(e) => this.handleChange(e)}>
                <option value=''>--</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            {' '}
          <input type="submit" value="join event" />
        </form>
      </>
    );
  }
}