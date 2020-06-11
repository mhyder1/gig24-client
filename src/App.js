import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import AppContext from "./Component/AppContext";
import Header from "./Component/Header/Header";
import LandingPg from "./Component/LandingPg/LandingPg";
import CreateEmpPro from "./Component/CreateProfile/CreateEmpPro";
import CreateJobSeekerPro from "./Component/CreateProfile/CreateJobSeekerPro";
import EditJobSeekerPro from "./Component/CreateProfile/EditJobSeekerPro";
import EmpDash from "./Component/EmpDash/EmpDash";
import PostAgig from "./Component/EmpPostAgig/PostAgig";
import JobSeekerDash from "./Component/JobSeekerDash/JobSeekerDash";
import JobSeekerPro from "./Component/JobSeekerProfile/JobSeekerPro.js";
import JsHome from "./Component/JobSeekerHome/js-home";
import Signup from "./Component/Signup/Signup";
import Login from "./Component/Login/Login";
import NavMenu from "./Component/NavMenu/NavMenu";
import NavMenuEmp from "./Component/NavMenu/NavMenuEmp";
import ErrorBoundary from "./ErrorBoundary";
import PrivateRoute from "./Component/Utils/PrivateRoute";
import TokenService from "./services/token-service";
import AuthApiService from "./services/auth-api-service";
import IdleService from "./services/idle-service";
import EmpProfile from "./Component/EmpProfile/EmpProfile";
import config from "./config.js";
import "./App.css";

class App extends Component {
  static contextType = AppContext;

  state = {
    jobs: [],
    applicants: [],
    gigs: [],
    userInfo: {},
    appliedUser: [],
    jsProfile: [],
    empPros: {},
    user_id: null,
    employer: null,
    token: TokenService.hasAuthToken()
      ? TokenService.readJwtToken()
      : { user_id: "" },
  };

  addJob = (job) => {
    this.setState({
      jobs: [...this.state.jobs, job],
    });
  };

  clearContext = () => {
    this.setState({
      jsProfile: [],
      gigs: [],
      appliedUser: [],
      token: {},
    });
  };

  createUserProfile = (profile) => {
    this.setState({
      jsProfile: profile,
    });
  };

  createEmpProfile = (profile) => {
    this.setState({
      empPros: profile,
    });
  };

  deleteEmpJob = (id) => {
    console.log(id)
    this.setState({
      jobs: this.state.jobs.filter(job => job.id !== id)
    })
  }

  updateApplications = (id) => {
    this.setState({
      appliedUser: this.state.appliedUser.filter(app => app.id !== id)
    })
  }

  removeApplication = (user_id) => {
    fetch(`${config.API_ENDPOINT}/jobs/gigs/${user_id}`)
    .then(res => res.json())
    .then(gigs => {
      this.setState({gigs})
    })
    .catch(error => console.log(error))
  }

  updateGigs = (gigs) => {
    this.setState({
      gigs
    })
  }


  setUserId = (user_id, employer) => {
    this.setState({
      user_id,
      employer,
    });
  };

  getEmployerData = (user_id) => {
    if (!user_id) return;
    Promise.all([
      fetch(`${config.API_ENDPOINT}/applied/current/${user_id}`),
      fetch(`${config.API_ENDPOINT}/jobs/byuser/${user_id}`),
      fetch(`${config.API_ENDPOINT}/empprofile/emp/${user_id}`),
    ])
      .then(([appRes, jobsRes, empProRes]) => {
        // if (!appRes.ok) return appRes.json().then((e) => Promise.reject(e));
        // if (!jobsRes.ok) return jobsRes.json().then((e) => Promise.reject(e));
        // if (!empProRes.ok) return empProRes.json().then((e) => Promise.reject(e));
        return Promise.all([appRes.json(), jobsRes.json(), empProRes.json()]);
      })
      .then(([applicants, jobs, empPros]) => {
        this.setState({ applicants, jobs, empPros });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  getJobSeekerData = (user_id) => {
    // const { user_id } = this.state.token;
    if (!user_id) return;
    Promise.all([
      fetch(`${config.API_ENDPOINT}/jobs/gigs/${user_id}`),
      fetch(`${config.API_ENDPOINT}/applied/user/${user_id}`),
      fetch(`${config.API_ENDPOINT}/userprofile/user/${user_id}`),
    ])
      .then(([gigRes, appliedUserRes, userProRes]) => {
        // if (!gigRes.ok) return gigRes.json().then((e) => Promise.reject(e));
        // if (!appliedUserRes.ok) return appliedUserRes.json().then((e) => Promise.reject(e));
        // if (!userProRes.ok) return userProRes.json().then((e) => Promise.reject(e));
        return Promise.all([
          gigRes.json(),
          appliedUserRes.json(),
          userProRes.json(),
        ]);
      })
      .then(([gigs, appliedUser, jsProfile]) => {
        this.setState({ gigs, appliedUser, jsProfile });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    const { user_id } = this.state;
    if (prevState.user_id !== this.state.user_id && this.state.employer) {
      this.getEmployerData(user_id);
    } else if (
      prevState.user_id !== this.state.user_id && !this.state.employer
    ) {
      this.getJobSeekerData(user_id);
    }
  }

  componentDidMount() {
    console.log('components mounting')
    const token = TokenService.hasAuthToken()
      ? TokenService.readJwtToken()
      : { user_id: "" };
    this.setState({ userInfo: token });
    const { user_id, employer } = this.state.token;
    
    if (employer) {
      this.getEmployerData(user_id);
    } else {
      this.getJobSeekerData(user_id);
    }

    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
       tell the idle service to register event listeners
       the event listeners are fired when a user does something, e.g. move their mouse
       if the user doesn't trigger one of these event listeners,
         the idleCallback (logout) will be invoked
     */
      IdleService.regiserIdleTimerResets();

      /*
       Tell the token service to read the JWT, looking at the exp value
       and queue a timeout just before the token expires
     */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }
  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  };

  render() {
    const value = {
      jobs: this.state.jobs,
      applicants: this.state.applicants,
      gigs: this.state.gigs,
      addJob: this.addJob,
      userInfo: this.state.userInfo,
      appliedUser: this.state.appliedUser,
      jsProfile: this.state.jsProfile,
      empPros: this.state.empPros,
      setUserId: this.setUserId,
      clearContext: this.clearContext,
      createUserProfile: this.createUserProfile,
      createEmpProfile: this.createEmpProfile,
      updateApplications: this.updateApplications,
      updateGigs: this.updateGigs,
      deleteEmpJob: this.deleteEmpJob,
      removeApplication: this.removeApplication
    };

    return (
      <ErrorBoundary>
        <AppContext.Provider value={value}>
          <>
            <div className="App">
              <header className="App-header">
                <Route path="/" component={Header} />
              </header>

              {/* Unprotected route */}
              <section className="App-landing">
                <Route exact path="/" component={LandingPg} />
              </section>

              {/* Unprotected route */}
              <section className="create-profile">
                <PrivateRoute path="/crt-e-profile" component={CreateEmpPro} />
                <PrivateRoute path="/crt-js-profile" component={NavMenu} />
                <PrivateRoute
                  path="/crt-js-profile"
                  component={CreateJobSeekerPro}
                />
              </section>
              <section>
                <PrivateRoute
                  path="/edit-js-profile"
                  component={EditJobSeekerPro}
                />
              </section>

              <section className="js-profile">
                <PrivateRoute path="/js-profile" component={NavMenu} />
                <PrivateRoute path="/js-profile" component={JobSeekerPro} />
              </section>

              {/* Unprotected route */}
              <section className="sign-up">
                {/* <Route path="/signup" component={NavMenu} /> */}
                <Route path="/signup" component={Signup} />
              </section>

              <section>
                {/* <Route path="/login" component={NavMenu} /> */}
                <Route path="/login" component={Login} />
              </section>
              <section>
                <PrivateRoute
                  exact
                  path="/e-dashboard"
                  component={NavMenuEmp}
                />
                <PrivateRoute exact path="/e-dashboard" component={EmpDash} />
              </section>
              <PrivateRoute path="/js-home" component={NavMenu} />
              <PrivateRoute path="/js-home" component={JsHome} />
              <section>
                <PrivateRoute path="/js-dashboard" component={NavMenu} />
                <PrivateRoute path="/js-dashboard" component={JobSeekerDash} />
              </section>
              <PrivateRoute path="/post-gig" component={NavMenuEmp} />
              <PrivateRoute path="/post-gig" component={PostAgig} />
              {/* Protected route */}

              {/* Protected route */}
              <section className="empprofile">
                <PrivateRoute path="/empprofile" component={NavMenuEmp} />
                <PrivateRoute path="/empprofile" component={EmpProfile} />
              </section>
            </div>
          </>
        </AppContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default withRouter(App);
