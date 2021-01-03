import React from 'react';
import { mount } from 'enzyme';
import HttpsRedirect from '../HttpsRedirect';

describe('HttpsRedirect', () => {
  beforeEach(() => {
    jest.spyOn(window.location, 'assign').mockReturnValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('is disabled', () => {
    describe('environment is production', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      afterEach(() => {
        process.env.NODE_ENV = 'test';
      });

      it('does not redicrect to https', () => {
        HttpsRedirect({ disabled: true });
        expect(window.location.assign).not.toBeCalled();
      });
    });

    describe('environment is not production', () => {
      it('does not redicrect to https', () => {
        HttpsRedirect({ disabled: true });
        expect(window.location.assign).not.toBeCalled();
      });
    });
  });

  describe('is enabled', () => {
    describe('environment is production', () => {
      beforeEach(() => {
        process.env.NODE_ENV = 'production';
      });

      afterEach(() => {
        process.env.NODE_ENV = 'test';
      });

      it('does not redicrect to https', () => {
        HttpsRedirect({});
        expect(window.location.assign).toBeCalledWith('https://localhost/');
      });
    });

    describe('environment is not production', () => {
      it('does not redicrect to https', () => {
        HttpsRedirect({});
        expect(window.location.assign).not.toBeCalled();
      });
    });
  });
});
