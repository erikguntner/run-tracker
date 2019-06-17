import React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

const setUp = () => {
  const enzymeProps = {
    field: {
      name: 'distance',
      value: 45,
    },
    form: {
      touched: {
        distance: false,
      },
      errors: {
        distance: 'is required',
      },
    },
    type: 'number',
  };

  const enzymeWrapper = shallow(<Input {...enzymeProps} />);

  return { enzymeProps, enzymeWrapper };
};

describe('<Input />', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    const { enzymeWrapper, enzymeProps } = setUp();
    props = enzymeProps;
    wrapper = enzymeWrapper;
  });

  it('renders an input', () => {
    expect(wrapper.find('input').length).toBe(1);
  });

  it('renders an error message when touched and errors', () => {
    expect(wrapper.find('.error').length).toBe(0);
    wrapper.setProps({
      form: {
        touched: {
          distance: true,
        },
        errors: {
          distance: 'is required',
        },
      },
    });

    expect(wrapper.find('.error').length).toBe(1);
    expect(wrapper.find('.errorMessage').length).toBe(1);
    expect(wrapper.find('.errorMessage').text()).toEqual('is required');
  });
});
