import { OrderDetails } from 'constants/CustomerPayments';
import moment from 'moment';

export const HardCodedOrderDetails = {
  status: 'order-status',
  orderNumber: 1,
  price: 1.0,
  storeName: 'store-name',
  storePhoneNumber: 'store-phone-number',
  markAsPaid: true,
  markAsPaidTime: 1601607445,
  crypto: 'ETHEREUM',
} as OrderDetails;

export const buildOrderDetailsResponse = (props: {
  status?: string;
  hasStoreDetails?: boolean;
  hasCryptoETH?: boolean;
  hasCryptoUSDT?: boolean;
  markAsPaid?: boolean;
  isExpired?: boolean;
  hasHashETH?: boolean;
  hasHashUSDT?: boolean;
}): any => ({
  data: {
    type: 'orders',
    attributes: {
      'external-order-id': 'NjKvLP1o',
      price: '67.77',
      'phone-number': '1-924-340-4717',
      name: 'Peggy Nikolaus',
      status: props.status,
      'expire-at': !props.isExpired && moment().add(30, 'minutes'),
      'marked-as-paid': props.markAsPaid,
      'marked-as-paid-at': props.markAsPaid && 1601607445,
    },
    relationships: {
      store: {
        data: {
          type: 'stores',
          id: '2',
        },
      },
      payments: {
        data: [
          {
            type: 'payments',
            id: '3',
          },
          {
            type: 'payments',
            id: '4',
          },
        ],
      },
    },
  },
  included: [
    props.hasStoreDetails && {
      id: '2',
      type: 'stores',
      links: {
        self: 'http://192.168.0.80:3000/v1/stores/2',
      },
      attributes: {
        name: 'Marilu Harvey MD',
        address: 'Suite 612 42874 Timmy Drive, Kerlukechester, IN 43320',
        'phone-number': '993.885.9672',
      },
      relationships: {
        merchant: {
          links: {
            self: 'http://192.168.0.80:3000/v1/stores/2/relationships/merchant',
            related: 'http://192.168.0.80:3000/v1/stores/2/merchant',
          },
        },
        orders: {
          links: {
            self: 'http://192.168.0.80:3000/v1/stores/2/relationships/orders',
            related: 'http://192.168.0.80:3000/v1/stores/2/orders',
          },
          data: [
            {
              type: 'orders',
              id: '2',
            },
          ],
        },
      },
    },
    props.hasCryptoETH && {
      id: '3',
      type: 'payments',
      attributes: {
        amount: '0.47646764203043',
        'paid-amount': null,
        'destination-address': '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
        'payment-type': 'ETH',
        'tx-hash': props.hasHashETH && 'transaction-hash-eth',
      },
    },
    props.hasCryptoUSDT && {
      id: '5',
      type: 'payments',
      attributes: {
        amount: null,
        'paid-amount': '0.755828606587089',
        'destination-address': null,
        'payment-type': 'USDT',
        'tx-hash': props.hasHashUSDT && 'transaction-hash-usdt',
      },
    },
  ],
});
