import { shallow } from 'enzyme';
import HomePage from '../index';
import React from 'react';

describe('HomePage', () => {
  it('renders template exactly', () => {
    expect(shallow(<HomePage />)).toMatchSnapshot();
  });
});
