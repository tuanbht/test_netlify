import axiosClient from '../ApiClient';
import { store } from '../ReduxStore';
import faker from 'faker';
import { OrderDetails } from '../../constants/CustomerPayments';
import { mockAxios } from '../ConfigureTestStore';
import { NOT_FOUND_PATH } from '../../constants/RouterPaths';

describe('ApiClient', () => {
  const token = faker.random.uuid();

  describe('axiosClient', () => {
    it('returns default with customized headers', () => {
      expect(axiosClient.defaults.headers).toMatchSnapshot();
    });
  });

  describe('axios request header', () => {
    beforeEach(() => {
      mockAxios.onAny().reply(200);
    });

    describe('payment token is stored', () => {
      beforeEach(() => {
        jest.spyOn(store, 'getState').mockReturnValue({
          OrderDetails: new OrderDetails(),
          Credential: {
            orderId: 0,
            token,
          },
        });
      });

      it('makes request with payment token header', async () => {
        const response = await axiosClient.get('/');
        expect(response.config.headers['Payment-Token']).toEqual(token);
      });
    });

    describe('payment token is not stored', () => {
      beforeEach(() => {
        jest.spyOn(window.location, 'assign').mockReturnValue();

        jest.spyOn(store, 'getState').mockReturnValue({
          OrderDetails: new OrderDetails(),
          Credential: {
            orderId: 0,
            token: '',
          },
        });
      });

      it('redirects to not found page', async () => {
        const response = await axiosClient.get('/');
        expect(response.config.headers['Payment-Token']).toBeUndefined();
        expect(window.location.assign).toBeCalledWith(NOT_FOUND_PATH);
      });
    });
  });
});
