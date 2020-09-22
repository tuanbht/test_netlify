import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import Header from '../index';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

describe('Header', () => {
  const goBack = jest.fn();
  const buildContainer = (showBack: boolean): ShallowWrapper => shallow(<Header showBack={showBack} goBack={goBack} />);
  let container: ShallowWrapper;

  describe('can back is false', () => {
    beforeEach(() => {
      container = buildContainer(false);
    });

    it('renders template without arrow back button', () => {
      expect(container).toMatchSnapshot();
    });
  });

  describe('can back is true', () => {
    beforeEach(() => {
      container = buildContainer(true);
    });

    it('renders template with arrow back button', () => {
      expect(container).toMatchSnapshot();
    });

    describe('click go back button', () => {
      beforeEach(() => {
        container.find(ArrowBackIcon).simulate('click');
      });

      it('should call go back function', () => {
        expect(goBack).toBeCalled();
      });
    });
  });
});
