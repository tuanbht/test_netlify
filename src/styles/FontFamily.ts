import RobotoLight from 'assets/fonts/Roboto-Light.ttf';
import RobotoMedium from 'assets/fonts/Roboto-Medium.ttf';
import RobotoRegular from 'assets/fonts/Roboto-Regular.ttf';
import RobotoBold from 'assets/fonts/Roboto-Bold.ttf';

export const RobotoRegularFont = {
  fontFamily: 'Roboto',
};

export const RobotoLightFont = {
  fontFamily: 'Roboto-Light',
};

export const RobotoMediumFont = {
  fontFamily: 'Roboto-Medium',
};

export const RobotoBoldFont = {
  fontFamily: 'Roboto-Bold',
};

export const FontFaceList = [
  {
    ...RobotoRegularFont,
    src: `url(${RobotoRegular})`,
  },
  {
    ...RobotoLightFont,
    src: `url(${RobotoLight})`,
  },
  {
    ...RobotoMediumFont,
    src: `url(${RobotoMedium})`,
  },
  {
    ...RobotoBoldFont,
    src: `url(${RobotoBold})`,
  },
];
