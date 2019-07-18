import React from 'react';
import { shallow } from 'enzyme';
import { RouteList } from '../RouteList';
import { RouteCard } from '../RouteCard';

const setUp = () => {
  const enzymeProps = {
    getRoutes: jest.fn(),
    deleteRoute: jest.fn(),
    routes: [],
    loadingRoutes: true,
    authenticated: 'authenticated',
    type: 'list',
  };

  const enzymeWrapper = shallow(<RouteList {...enzymeProps} />);

  return {
    enzymeProps,
    enzymeWrapper,
  };
};

describe('<RouteList />', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const { enzymeWrapper, enzymeProps } = setUp();
    wrapper = enzymeWrapper;
    props = enzymeProps;
  });

  it('should have the className of list when type equals list', () => {
    expect(wrapper.find('.list').length).toBe(1);
  });

  it('should have the className of grid when type equals grid', () => {
    wrapper.setProps({
      type: 'grid',
    });

    expect(wrapper.find('.grid').length).toBe(1);
  });

  it('should render a loading div when loading is true and list is empty', () => {
    expect(
      wrapper
        .find('.list')
        .childAt(0)
        .text()
    ).toBe('...Loading');
  });

  it('should render show a list of routes', () => {
    const routes = [
      {
        title: 'route 1',
        _id: 1,
      },
      {
        title: 'route 2',
        _id: 2,
      },
    ];

    wrapper.setProps({
      routes,
    });

    expect(
      wrapper
        .find('div')
        .first()
        .children().length
    ).toBe(2);
  });
});
