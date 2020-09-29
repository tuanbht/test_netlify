import { mount } from 'enzyme';
import React from 'react';
import Complete from '../index';
import { Provider } from 'react-redux';
import { testStore } from '../../../../../configurations/ConfigureTestStore';
import { HardCodedOrderDetails } from '../../../../../factories/OrderDetails';

describe('Complete', () => {
  const store = testStore({
    OrderDetails: HardCodedOrderDetails,
  });

  it('renders template correctly', () => {
    expect(
      mount(
        <Provider store={store}>
          <Complete />
        </Provider>,
      ),
    ).toMatchSnapshot();
  });
});
