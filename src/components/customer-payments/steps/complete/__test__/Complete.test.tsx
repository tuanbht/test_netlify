import { shallow } from 'enzyme';
import React from 'react';
import Complete from '../index';

describe('Complete', () => {
  it('renders template correctly', () => {
    expect(shallow(<Complete />)).toMatchSnapshot();
  });
});
