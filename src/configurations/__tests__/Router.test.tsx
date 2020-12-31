import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import faker from 'faker';
import { Provider } from 'react-redux';
import { NOT_FOUND_PATH, ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH, ORDER_PATH, ROOT_PATH } from 'constants/RouterPaths';
import { ORDER_CANCELLED_CONTENT, ORDER_EXPIRED_CONTENT, ROOT_PAGE_CONTENT } from 'constants/NotificationContent';
import { CustomerPayments, NotFound, NotificationPage, HomePage } from 'containers';
import { testStore } from '../ConfigureTestStore';
import Router from '../Router';

describe('Router', () => {
  const renderPage = (entriesPath: string): ReactWrapper => {
    return mount(
      <Provider store={testStore()}>
        <MemoryRouter initialEntries={[entriesPath]}>
          <Router />
        </MemoryRouter>
      </Provider>,
    );
  };

  it('renders root page', () => {
    expect(renderPage(ROOT_PATH).find(HomePage)).toHaveLength(1);
  });

  it('renders order cancelled page', () => {
    expect(renderPage(ORDER_CANCELLED_PATH).find(NotificationPage).props().content).toEqual(ORDER_CANCELLED_CONTENT);
  });

  it('renders order expired page', () => {
    expect(renderPage(ORDER_EXPIRED_PATH).find(NotificationPage).props().content).toEqual(ORDER_EXPIRED_CONTENT);
  });

  describe('customer payments', () => {
    let container: ReactWrapper;

    beforeEach(() => {
      jest.spyOn(window.location, 'assign').mockImplementation(jest.fn());
    });

    describe('token and order id are valid', () => {
      beforeEach(() => {
        container = renderPage(ORDER_PATH.replace(':orderId', '1').replace(':token', 'token'));
      });

      it('renders customer payments page', () => {
        expect(container.find(CustomerPayments)).toHaveLength(1);
      });
    });

    describe('token and order id are invalid', () => {
      beforeEach(() => {
        container = renderPage(ORDER_PATH);
      });

      it('redirects to not found page', () => {
        expect(renderPage(ORDER_PATH).find(CustomerPayments)).toHaveLength(1);
      });
    });
  });

  it('renders not found page', () => {
    expect(renderPage(NOT_FOUND_PATH).find(NotFound)).toHaveLength(1);
  });

  describe('go from another url', () => {
    let container: ReactWrapper;

    beforeEach(() => {
      container = renderPage(faker.internet.domainWord());
    });

    it('redirects to not found page', () => {
      expect(container.find(NotFound)).toHaveLength(1);
    });
  });
});
