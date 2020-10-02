import { ORDER_STATUS, OrderDetails } from '../constants/CustomerPayments';
import faker from 'faker';

export const HardCodedOrderDetails = {
  status: 'order-status',
  orderNumber: 1,
  price: 1.0,
  storeName: 'store-name',
  storePhoneNumber: 'store-phone-number',
  markAsPaid: true,
  markAsPaidTime: 1601607445,
} as OrderDetails;

export const OrderDetailsEntity = {
  status: ORDER_STATUS.initialized,
  orderNumber: faker.random.number(),
  price: faker.random.number(),
  storeName: faker.company.companyName(),
  storePhoneNumber: faker.phone.phoneNumber(),
  markAsPaid: true,
  markAsPaidTime: new Date().getTime() / 1000,
} as OrderDetails;

export const buildOrderDetailsResponse = (props: {
  status?: string;
  hasStoreDetails?: boolean;
  hasCryptoETH?: boolean;
  hasCryptoBTC?: boolean;
  hasCryptoUSDT?: boolean;
  markAsPaid?: boolean;
}): any => ({
  data: {
    type: 'orders',
    attributes: {
      'external-order-id': 'NjKvLP1o',
      price: '67.77',
      'phone-number': '1-924-340-4717',
      name: 'Peggy Nikolaus',
      status: props.status,
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
        'destination-wallet': '0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE',
        'payment-type': 'ETH',
      },
    },
    props.hasCryptoBTC && {
      id: '4',
      type: 'payments',
      attributes: {
        amount: '0.755828606587089',
        'destination-wallet': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'payment-type': 'BTC',
      },
    },
    props.hasCryptoUSDT && {
      id: '5',
      type: 'payments',
      attributes: {
        amount: '0.755828606587089',
        'destination-wallet': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'payment-type': 'USDT',
      },
    },
  ],
});
