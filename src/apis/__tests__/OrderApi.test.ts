import axiosClient from '../ApiClient';
import faker from 'faker';
import OrderApi from '../OrderApi';
import { replace } from 'lodash';
import { CANCEL_ORDER_PATH } from '../../constants/ApiPaths';
import DataStorage from '../../configurations/DataStorage';

describe('OrderApi', () => {
  const token = faker.random.uuid();
  const id = faker.random.number();

  beforeEach(() => {
    jest.spyOn(window.location, 'assign');
  });

  afterEach(() => {
    DataStorage.clearAll();
  });

  describe('order id and payment token are present', () => {
    beforeEach(() => {
      DataStorage.setToken(token);
      DataStorage.setOrderId(id);
    });

    describe('cancelOrder', () => {
      beforeEach(() => {
        jest.spyOn(axiosClient, 'put');
        OrderApi.cancelOrder();
      });

      it('should call api with put method', () => {
        const url = replace(CANCEL_ORDER_PATH, ':id', String(id));

        expect(axiosClient.put).toBeCalledWith(url);
      });
    });
  });

  describe('order id is not present', () => {
    beforeEach(() => {
      DataStorage.setToken(token);
      OrderApi.cancelOrder();
    });

    it('leads to not found page', () => {
      expect(window.location.assign).toBeCalledWith('/');
    });
  });

  describe('pyament token is not present', () => {
    beforeEach(() => {
      DataStorage.setOrderId(id);
      OrderApi.cancelOrder();
    });

    it('leads to not found page', () => {
      expect(window.location.assign).toBeCalledWith('/');
    });
  });
});
