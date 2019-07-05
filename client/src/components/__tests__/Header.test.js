import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../Header';

const setUp = () => {
  const enzymeProps = {
    signout: jest.fn(),
    location: {
      pathname: '/profile',
    },
    authenticated: 'authenticated',
  };

  const enzymeWrapper = shallow(<Header {...enzymeProps} />);

  return {
    enzymeProps,
    enzymeWrapper,
  };
};

describe('<Header />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const { enzymeWrapper, enzymeProps } = setUp();
    wrapper = enzymeWrapper;
    props = enzymeProps;
  });

  it('Toggle renders menu button and signout if url path contains "profile" and the user is authenticated', () => {
    const newWrapper = wrapper.find('Toggle').renderProp('children')(
      false,
      jest.fn()
    );

    expect(wrapper.find('.menuButton').length).toBe(0);
  });

  it('renders menu button if url path contains "profile" and the user is authenticated', () => {
    const newWrapper = wrapper.find('Toggle').renderProp('children')(
      true,
      jest.fn()
    );
    // console.log(newWrapper.debug());

    expect(wrapper.find('.menuButton').length).toBe(0);

    // wrapper.setProps({
    //   location: {
    //     pathname: '/profile/',
    //   },
    //   authenticated: 'authenticated',
    // });

    // wrapper.update();

    // expect(wrapper.find('.menuButton').length).toBe(1);
  });

  it('renders a Header tag', () => {
    expect(wrapper.find('header').length).toBe(1);
  });
});
