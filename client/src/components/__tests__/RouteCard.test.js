import React from 'react';
import { shallow } from 'enzyme';
import { RouteCard } from '../RouteCard';
import sinon from 'sinon';

const setUp = () => {
  const enzymeProps = {
    deleteRoute: jest.fn(),
    route: {
      _id: 123,
      img: 'img',
      title: 'my route',
      distance: [0, 1, 2],
    },
    id: '123',
  };

  const enzymeWrapper = shallow(<RouteCard {...enzymeProps} />);

  return {
    enzymeProps,
    enzymeWrapper,
  };
};

describe('<RouteCard />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const { enzymeWrapper, enzymeProps } = setUp();

    wrapper = enzymeWrapper;
    props = enzymeProps;
  });

  it('should render a card with the details of the route', () => {
    expect(
      wrapper
        .find('.row')
        .childAt(0)
        .text()
    ).toEqual(props.route.title);
  });

  it('should call deleteRoute when onClick event fires', () => {
    const button = wrapper.find('button').first();
    button.simulate('click');
    expect(props.deleteRoute).toHaveBeenCalled();
  });
});
