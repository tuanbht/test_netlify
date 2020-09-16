import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('App', () => {
  it('renders template correctly', () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
