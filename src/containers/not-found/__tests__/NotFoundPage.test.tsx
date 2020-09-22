import { shallow } from 'enzyme';
import NotFoundPage from '../index';
import React from 'react';

describe('NotFoundPage', () => {
  it('renders template exactly', () => {
    expect(shallow(<NotFoundPage />)).toMatchSnapshot();
  });
});
