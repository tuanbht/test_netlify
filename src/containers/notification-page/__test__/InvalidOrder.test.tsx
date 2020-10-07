import { shallow } from 'enzyme';
import React from 'react';
import InvalidOrder from '../index';

describe('InvalidOrder', () => {
  it('renders template correctly', () => {
    expect(
      shallow(<InvalidOrder content={{ title: 'invalid-order-title', subtitle: 'invalid-order-subtitle' }} />),
    ).toMatchSnapshot();
  });
});
