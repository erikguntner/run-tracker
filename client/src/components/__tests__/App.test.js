import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { shallow } from 'enzyme';
import App from '../App';
import Map from '../Map';

it('renders map component', () => {
  const wrapper = shallow(<App />);
});
