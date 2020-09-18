import { shallow } from 'enzyme';
import React from 'react';
import Header from '../index';

describe('Header', () => {
  it('renders template correctly', () => {
    expect(shallow(<Header canBack={true} goBack={jest.fn()} />)).toMatchSnapshot();
  });
});
