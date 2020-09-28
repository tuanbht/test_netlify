import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Router from '../Router';
import { NOT_FOUND_PATH, ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH } from '../../constants/RouterPaths';
import InvalidOrder from '../../containers/invalid-order';
import { ORDER_CANCELLED_CONTENT, ORDER_EXPIRED_CONTENT } from '../../constants/InvalidOrder';
import { NotFound } from '../../containers';

describe('Router', () => {
  const renderPage = (entriesPath: string): ReactWrapper => {
    return mount(
      <MemoryRouter initialEntries={[entriesPath]}>
        <Router />
      </MemoryRouter>,
    );
  };

  it('renders order cancelled page', () => {
    expect(renderPage(ORDER_CANCELLED_PATH).find(InvalidOrder).props().content).toEqual(ORDER_CANCELLED_CONTENT);
  });

  it('renders order expired page', () => {
    expect(renderPage(ORDER_EXPIRED_PATH).find(InvalidOrder).props().content).toEqual(ORDER_EXPIRED_CONTENT);
  });

  it('renders not found page', () => {
    expect(renderPage(NOT_FOUND_PATH).find(NotFound)).toHaveLength(1);
  });
});
