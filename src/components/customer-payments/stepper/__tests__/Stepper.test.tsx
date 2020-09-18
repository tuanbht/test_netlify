import { shallow } from 'enzyme';
import React from 'react';
import Stepper from '../index';

describe('Stepper', () => {
  it('renders template correctly', () => {
    const steps = ['step-1', 'step-2', 'step-3'];

    expect(
      shallow(
        <Stepper activeStep={0} stepper={steps}>
          <div>Children</div>
        </Stepper>,
      ),
    ).toMatchSnapshot();
  });
});
