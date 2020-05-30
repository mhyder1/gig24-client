import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppContext from "./ComponentPC/Context/AppContext";
import Header from "./Component/Header/Header";
import LandingPg from './Component/LandingPg/LandingPg';
import CreateEmpPro from './Component/CreateProfile/CreateEmpPro';
import CreateJobSeekerPro from './Component/CreateProfile/CreateJobSeekerPro';
import EmpDash from './Component/EmpDash/EmpDash'
import PostAgig from "./Component/EmpPostAgig/PostAgig";
import JobSeekerDash from './Component/JobSeekerDash/JobSeekerDash'
// import Intro from "./ComponentPC/Intro/Intro";
import Signup from "./Component/Signup/Signup";
// import AddEvents from "./ComponentPC/AddEvents/AddEvents";
// import NavMenu from "./ComponentPC/NavMenu/NavMenu";
// import EventList from "./ComponentPC/EventList/EventList";
// import UpdateEvents from "./ComponentPC/UpdateEvents/UpdateEvents"
import Login from './Component/Login/Login';
// import MyEvents from './ComponentPC/MyEvents/MyEvents';
// import JoinEvent from './ComponentPC/JoinEvent/JoinEvent';
// import ErrorBoundary from './ErrorBoundary'
// import PrivateRoute from './Component/Utils/PrivateRoute';
//  import TokenService from './services/token-service';
//  import AuthApiService from './services/auth-api-service';
//  import IdleService from './services/idle-service';

//import config from './config.js';
import "./App.css";


class App extends Component {
  static contextType = AppContext;

  // state = {
  //   events: [],
  //   users:[],
  //   attend: [],
  //   hasError: false,
  //   user_id: '',
  //   fullname: ''
  // };

  // static getDerivedStateFromError(error) {
  //   console.error(error)
  //   return { hasError: true }
  // }

  // addEvent = (event) => {
  //   this.setState({
  //     events: [...this.state.events, event],
  //   });
  // };

  // updateEvent = (ev) => {
  //   const updatedEvents = this.state.events.filter(event => event.id !== ev.id)
  //   this.setState({
  //     events: [...updatedEvents, ev],
  //   });
  // };


  // joinEvent = (att) => {
  //   this.setState({
  //     attend: [...this.state.attend, att]
  //   })
  // }

  // removeAttend = (att_id) => {
  //   this.setState({
  //     attend: this.state.attend.filter(att => att.id !== att_id)
  //   });
  // }

  // setUserId = (user_id, fullname) => {
  //   this.setState({
  //     user_id,
  //     fullname
  //   })
  // }



  // componentDidMount() {
  //   Promise.all([
  //     fetch(`${config.API_ENDPOINT}/events`),
  //     fetch(`${config.API_ENDPOINT}/attend`)
  //   ])
  //   .then(([eventsRes, attendRes]) => {
  //     if (!eventsRes.ok) return eventsRes.json().then((e) => Promise.reject(e));
  //     if (!attendRes.ok) return attendRes.json().then((e) => Promise.reject(e));
  //     return Promise.all([eventsRes.json(), attendRes.json()]);
  //   })
  //   .then(([events, attend]) => {
  //     this.setState({ events, attend });
  //   })
  //   .catch((error) => {
  //     console.log({ error })
  //   });
  //   /*
  //     set the function (callback) to call when a user goes idle
  //     we'll set this to logout a user when they're idle
  //   */
  //  IdleService.setIdleCallback(this.logoutFromIdle)

  //  /* if a user is logged in */
  //  if (TokenService.hasAuthToken()) {
  //    /*
  //      tell the idle service to register event listeners
  //      the event listeners are fired when a user does something, e.g. move their mouse
  //      if the user doesn't trigger one of these event listeners,
  //        the idleCallback (logout) will be invoked
  //    */
  //    IdleService.regiserIdleTimerResets()

  //    /*
  //      Tell the token service to read the JWT, looking at the exp value
  //      and queue a timeout just before the token expires
  //    */
  //    TokenService.queueCallbackBeforeExpiry(() => {
  //      /* the timoue will call this callback just before the token expires */
  //      AuthApiService.postRefreshToken()
  //    })
  //  }

  // }

  // componentWillUnmount() {
  //   /*
  //     when the app unmounts,
  //     stop the event listeners that auto logout (clear the token from storage)
  //   */
  //   IdleService.unRegisterIdleResets()
  //   /*
  //     and remove the refresh endpoint request
  //   */
  //   TokenService.clearCallbackBeforeExpiry()
  // }

  // logoutFromIdle = () => {
  //   /* remove the token from localStorage */
  //   TokenService.clearAuthToken()
  //   /* remove any queued calls to the refresh endpoint */
  //   TokenService.clearCallbackBeforeExpiry()
  //   /* remove the timeouts that auto logout when idle */
  //   IdleService.unRegisterIdleResets()
  //   /*
  //     react won't know the token has been removed from local storage,
  //     so we need to tell React to rerender
  //   */
  //   this.forceUpdate()
  // }

  render() {
    const value = {
      // events: this.state.events,
      // attend: this.state.attend,
      addEvent: this.addEvent,
      setUserId: this.setUserId,
      // updateEvent: this.updateEvent,
      // joinEvent: this.joinEvent,
      // removeAttend: this.removeAttend
    };

    return (
      // <ErrorBoundary>
      <AppContext.Provider value={value}>
        <>
           <div className="App">
            <header className="App-header">
              <Switch>
                <Route path="/" component={Header} />
                {/* <Route exact path="/" component={NavMenu} /> */}
              </Switch>
            </header>

            {/* Unprotected route */}
            <section className='home'>
            <Route exact path="/" component={LandingPg} />
            {/* <Route exact path="/" component={Intro} /> */}
            </section>

              {/* Unprotected route */}
            <section className='create-profile'>
              <Route path="/crt-e-profile" component={CreateEmpPro} />
              <Route path="/crt-js-profile" component={CreateJobSeekerPro} />
            </section> 

            {/* Unprotected route */}
            <section className='sign-up'>
              {/* <Route path="/signup" component={NavMenu} /> */}
              <Route path="/signup" component={Signup} />
            </section>
             
             <section>
              {/* <Route path="/login" component={NavMenu} /> */}
              <Route path="/login" component={Login}/>
            </section>
            <section>
              <Route path="/e-dashboard" component={EmpDash}/>
            </section>
            <section>
              <Route path="/js-dashboard" component={JobSeekerDash}/>
            </section>
            <Route path="/post-gig" component={PostAgig}/>
             {/* Protected route */}
            {/* <section className="add-events">
              <Route path="/add-events" component={NavMenu} />
              <Route path="/add-events" component={AddEvents} />
            </section> */}

            {/* Protected route */}
            {/* <section className="update-events">
              <Route path="/update-events" component={NavMenu} />
              <Route path="/update-events" component={UpdateEvents} />
            </section> */}

            {/* <section className="update-events">
              <Route path="/join-event" component={NavMenu} />
              <Route path="/join-event" component={JoinEvent} />
            </section> */}

            {/* Protected route */}
            {/* <section className="eventList">
              <PrivateRoute path="/arts-crafts" component={NavMenu} />
              <PrivateRoute path="/arts-crafts" component={EventList} />

              <PrivateRoute path="/music-dance" component={NavMenu} /> */}
              {/* <PrivateRoute path="/music-dance" component={EventList} />
             
              <PrivateRoute path="/outdoor-activities" component={NavMenu} /> 
              <PrivateRoute path="/outdoor-activities" component={EventList} />

              <PrivateRoute path="/sports-fitness" component={NavMenu} /> 
              <PrivateRoute path="/sports-fitness" component={EventList} />

              <PrivateRoute path="/books-films" component={NavMenu} />
              <PrivateRoute path="/books-films" component={EventList} />

              <PrivateRoute path="/tutoring" component={NavMenu} />
              <PrivateRoute path="/tutoring" component={EventList} />

              <PrivateRoute path="/my-events" component={NavMenu} />
              <PrivateRoute path="/my-events" component={MyEvents} /> */}
            {/* </section> */}
          </div>
        </>
      </AppContext.Provider>
      // </ErrorBoundary>
    );
  }
}

export default App;

