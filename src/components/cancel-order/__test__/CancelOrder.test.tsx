import { Button } from '@material-ui/core';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import CancelOrder from '../index';
import { MemoryRouter } from 'react-router-dom';
import { testStore } from 'configurations/ConfigureTestStore';
import { Provider } from 'react-redux';
import OrderActions from 'actions/OrderActions';
import faker from 'faker';

describe('CancelOrder', () => {
  const orderId = faker.random.number();
  const token = faker.random.uuid();

  const initStore = {
    Credential: {
      token,
      orderId,
    },
  };
  const store = testStore(initStore);
  let container: ReactWrapper;

  beforeAll(() => {
    jest.spyOn(store, 'dispatch');
    jest.spyOn(window.location, 'assign').mockImplementation(jest.fn());

    container = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CancelOrder />
        </MemoryRouter>
      </Provider>,
    );
  });

  describe('click on quit crypto payment button', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'Quit Crypto Payment' }).first().simulate('click');
    });

    it('should call cancel order api', () => {
      expect(store.dispatch).toBeCalledWith(OrderActions.cancelOrderAction(orderId));
    });
  });
});
