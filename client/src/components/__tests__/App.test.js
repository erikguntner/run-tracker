import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../App';
import Header from '../Header';

const setUp = () => {
  const enzymeProps = {
    loadUser: jest.fn(),
  };

  const enzymeWrapper = shallow(<App {...enzymeProps} />);

  return {
    enzymeProps,
    enzymeWrapper,
  };
};

describe('<App />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const { enzymeWrapper, enzymeProps } = setUp();
    wrapper = enzymeWrapper;
    props = enzymeProps;
  });

  it('renders without crashing', () => {
    expect(wrapper);
  });

  it('renders the Header component', () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <App {...props}>
        <div>this could be a route</div>
      </App>
    );

    expect(wrapper.contains(<div>this could be a route</div>)).toBe(true);
  });
});
