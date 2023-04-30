import React, { Component , useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import JobListing from './components/JobListing';
import PostJobs from './components/PostJobs';
import Users from './components/Users';
import MyJobs from './components/myJobs';

const initialState = {
  input: '',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    is_admin: ''
  },
  activeComponent: 'JobListing',
  Archive:false
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        is_admin: '',
      },
      component: 'JobListing',
    };
    
  }


  loadComponent = (componentName) => {
    this.setState({ component: componentName });
    console.log(this.state.component);
  };

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        is_admin: data.is_admin,
      },
    });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ route: route, component: 'JobListing', isSignedIn: true });
    } else {
      this.setState({ route: route });
    }
  };
  

  render() {
    const { isSignedIn, route, component } = this.state;

    let currentComponent;
    if (component === 'JobListing') {
      currentComponent = <JobListing user={this.state.user} active ={true}  myjobs={false}/>;
    } else if (component === 'PostJobs') {
      currentComponent = <PostJobs user={this.state.user} />;
    } else if (component === 'Users') {
      currentComponent = <Users />;
    } else if (component === 'myJobs') {
      currentComponent = <MyJobs user={this.state.user} />;
    } else if (component === 'Archive') {
      currentComponent = <JobListing user={this.state.user}  active ={false} myjobs={false}/>;
    } else {
      currentComponent = <JobListing user={this.state.user}  active ={true} myjobs={false} />;
    }
    // console.log("dssd" , currentComponent);

    return (
      <div className='App'>
        <ParticlesBg type='circle' bg={true} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          is_admin={this.state.user.is_admin}
          loadComponent={this.loadComponent}
        />
        {route === 'home' && (
          <div>
            <Logo />
            <Rank name={this.state.user.name} is_admin={this.state.user.is_admin} />
            {currentComponent}
          </div>
        )}
        {route === 'signin' && (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
        {route === 'register' && (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
