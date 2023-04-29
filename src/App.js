import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
 
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
 
import Rank from './components/Rank/Rank';
// import './App.css';
import PostJobs from './components/PostJobs';
import JobListing from './components/JobListing';

const initialState = {
  input: '',
 
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    is_admin:''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      is_admin: data.is_admin
    }})
  }

 

 
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
 
  

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn,  route } = this.state;


    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true}   />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                is_admin={this.state.user.is_admin}
              />
            
             {/* <PostJobs ={this.state.user}/> */}
             <JobListing user={this.state.user}/>

            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;