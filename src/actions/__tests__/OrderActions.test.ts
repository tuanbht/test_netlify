import OrderActions from '../OrderActions';

describe('OrderActions', () => {
  describe('getOrderDetailsAction', () => {
    it('returns get order details action', () => {
      expect(OrderActions.getOrderDetailsAction(1)).toMatchSnapshot();
    });
  });

  describe('cancelOrderAction', () => {
    it('returns cancel order action', () => {
      expect(OrderActions.cancelOrderAction(1)).toMatchSnapshot();
    });
  });

  describe('markAsPaidOrderAction', () => {
    it('returns mark as paid order action', () => {
      expect(OrderActions.markAsPaidOrderAction(1)).toMatchSnapshot();
    });
  });
});
