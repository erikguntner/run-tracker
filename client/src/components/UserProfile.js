import React, { Component } from 'react';
import requireAuth from './requireAuth';

class UserProfile extends Component {
  render() {
    return <h3>This is the user profile Page</h3>;
  }
}

export default requireAuth(UserProfile);
