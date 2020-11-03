import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Processing from '../index';
import { testStore } from 'configurations/ConfigureTestStore';
import { HardCodedOrderDetails } from 'factories/OrderDetails';
import { Provider } from 'react-redux';
import OrderActions from 'actions/OrderActions';
import faker from 'faker';
import { CRYPTO_CURRENCIES } from 'constants/CustomerPayments';

describe('Processing', () => {
  const orderId = faker.random.number();
  const store = testStore({
    OrderDetails: HardCodedOrderDetails,
    Credential: {
      orderId,
    },
  });
  let container: ReactWrapper;

  beforeEach(() => {
    CRYPTO_CURRENCIES.ETHEREUM.amount = faker.random.number();
    CRYPTO_CURRENCIES.ETHEREUM.paidAmount = faker.random.number();
    CRYPTO_CURRENCIES.ETHEREUM.txHash = 'transaction-hash';

    jest.spyOn(store, 'dispatch');
    jest.spyOn(window.location, 'assign').mockImplementation(jest.fn());
    jest.useFakeTimers();

    container = mount(
      <Provider store={store}>
        <Processing />
      </Provider>,
    );
  });

  it('renders template correctly', () => {
    expect(container).toMatchSnapshot();
  });

  describe('get order details every 5 seconds', () => {
    beforeEach(() => {
      jest.advanceTimersByTime(5000);
    });

    it('should call get order details action', () => {
      expect(store.dispatch).toBeCalledWith(OrderActions.getOrderDetailsAction(orderId));
    });
  });
});
