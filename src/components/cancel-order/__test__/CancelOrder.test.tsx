import { Button } from '@material-ui/core';
import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import CancelOrder from '../index';
import OrderApi from '../../../apis/OrderApi';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import faker from 'faker';
import DataStorage from '../../../configurations/DataStorage';

describe('CancelOrder', () => {
  it('renders template correctly', () => {
    expect(shallow(<CancelOrder />)).toMatchSnapshot();
  });

  describe('click on quit crypto payment button', () => {
    const history = createMemoryHistory();
    const token = faker.random.uuid();
    const id = faker.random.number();
    let container: ReactWrapper;

    beforeEach(() => {
      DataStorage.setToken(token);
      DataStorage.setOrderId(id);
      jest.spyOn(OrderApi, 'cancelOrder').mockImplementation(jest.fn());
      container = mount(
        <Router history={history}>
          <CancelOrder />
        </Router>,
      );

      container.find(Button).find({ children: 'Quit Crypto Payment' }).first().simulate('click');
    });

    afterEach(() => {
      DataStorage.clearAll();
    });

    it('should call cancel order api', () => {
      expect(OrderApi.cancelOrder).toBeCalled();
    });
  });
});
