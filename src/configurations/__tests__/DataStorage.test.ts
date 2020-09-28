import DataStorage from '../DataStorage';
import faker from 'faker';
import { ORDER_ID, PAYMENT_TOKEN } from '../../constants/StoreKeys';

describe('DataStorage', () => {
  const token = faker.random.uuid();
  const id = faker.random.number();

  describe('token', () => {
    beforeEach(() => {
      DataStorage.setToken(token);
    });

    it('persists token to local storage', () => {
      expect(localStorage.getItem(PAYMENT_TOKEN)).toEqual(token);
    });

    it('gets token from local storage', () => {
      expect(DataStorage.getToken()).toEqual(token);
    });
  });

  describe('orderId', () => {
    beforeEach(() => {
      DataStorage.setOrderId(id);
    });

    it('persists order id to local storage', () => {
      expect(localStorage.getItem(ORDER_ID)).toEqual(String(id));
    });

    it('gets order id from local storage', () => {
      expect(DataStorage.getOrderId()).toEqual(id);
    });
  });

  describe('clearAll', () => {
    beforeEach(() => {
      DataStorage.setToken(token);
      DataStorage.setOrderId(id);
      DataStorage.clearAll();
    });

    it('clears all data in storage', () => {
      expect(DataStorage.getToken()).toBeNull();
      expect(DataStorage.getOrderId()).toBeNaN();
    });
  });
});
